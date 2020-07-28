
let apdQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'kind');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['activate_account']);
    // query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

    d3.select("#activationsPerDayLink").attr("href", shareReport("mainnet", "operations", query))

    // console.log(result);

    label = [];
    times = [];
    activations = [];
    data = [];

    now = new Date().getTime()

    // now = new Date().getTime()
    // start = new Date(date)
    // start.setHours(0, 0, 0, 0)

    for(var time = date; time < now; time += 86400000) {
        value = new Date(time);
        value.setHours(0, 0, 0, 0)
        label.push(value);
        times.push(value.getTime());
        activations.push(0)
    }

    // console.log(label);
    
    for(var r = 0; r < result.length; r++) {
        for(var t = label.length - 1; t > 0; t--) {
            if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                activations[t] += parseInt(result[r].count_kind);
                break;
            }
        }
    }  

    for(var x = 0; x < activations.length; x++) {
        data.push({date : label[x].getTime(), values : parseInt(activations[x])});
    }

    svg = d3.select("#activationsPerDay");

    axis = d3.select("#apdAxis");

    seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, data, "date", "values");

    xTooltip = function(d, i) {
        return new Date(times[i]).toDateString()
    }

    yTooltip = function(d, i) {
        return d + " Account Activations per Day"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

    return result;                                              
}

now = new Date();
now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
now.setMinutes(0, 0, 0);

now = now.getTime();

apdQuery(now - (86400000 * 365));
