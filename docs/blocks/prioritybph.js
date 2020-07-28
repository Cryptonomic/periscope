
let prioritybphQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'hash');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'priority', conseiljs.ConseilOperator.EQ, [0]);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'blocks', query);

    d3.select("#priorityBlocksPerHourLink").attr("href", shareReport("mainnet", "blocks", query))

    label = [];
    timestamps = [];
    value = [];
    data = [];

    now = new Date().getTime();

    for(var time = new Date(date).getTime(); time < now; time += 3600000) {
        label.push(new Date(time));
        timestamps.push(time);
        value.push(0)
    }
    
    for(var r = 0; r < result.length; r++) {
        for(var t = label.length - 1; t > 0; t--) {
            if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                value[t] += 1;
                break;
            }
        }
    }   

    for(var x = 0; x < value.length; x++) {
        data.push({date : label[x].getTime(), value : parseInt(value[x])});
    }

    svg = d3.select("#priorityBPH");

    axis = d3.select("#priorityBPHAxis");

    // temporalLineGraphGenerator(500, 1200, svg, label, data, "date", "value");

    seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, data, "date", "value", 100, "black");

    xTooltip = function(d, i) {
        return new Date(timestamps[i])
    }

    yTooltip = function(d, i) {
        return d + " Priority Zero Blocks per Hour"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

    return result;                                              
}

now = new Date();
now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
now.setMinutes(0, 0, 0);

now = now.getTime();

prioritybphQuery(now - (604800000));
