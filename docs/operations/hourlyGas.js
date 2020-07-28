
let gphQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    if(new Date().getTime() - date > 31000000000) {
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'consumed_gas');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'cycle');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'consumed_gas', conseiljs.ConseilOperator.GT, [0]);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', conseiljs.ConseilFunction.sum);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "cycle", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#gasPerHourLink").attr("href", shareReport("mainnet", "operations", query))

        svg = d3.select("#gasPerHour");

        axis = d3.select("#gphAxis");

        seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, result, "cycle", "sum_consumed_gas");

        xTooltip = function(d, i) {
            return "Cycle " + result[i].cycle
        }

        yTooltip = function(d, i) {
            return d + " Gas Consumed per Cycle"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

        svg.selectAll("g").on("click", async function(d, i) {
            query = conseiljs.ConseilQueryBuilder.blankQuery();
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'consumed_gas');
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'consumed_gas', conseiljs.ConseilOperator.GT, [0]);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'cycle', conseiljs.ConseilOperator.EQ, [result[i].cycle]);
            query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', conseiljs.ConseilFunction.sum);
            query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
            query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

            const zoomResult = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

            d3.select("#gasPerHourLink").attr("href", shareReport("mainnet", "operations", query))

            timeArray = zoomResult.map(d => d.timestamp)

            label = [];
            timestamps = [];
            values = [];
            data = [];

            now = d3.max(timeArray)

            for(var time = d3.min(timeArray); time < now; time += 3600000) {
                label.push(new Date(time));
                timestamps.push(time);
                values.push(0)
            }

            console.log(timestamps);
            
            for(var r = 0; r < zoomResult.length; r++) {
                for(var t = label.length - 1; t > 0; t--) {
                    if(parseInt(zoomResult[r].timestamp) > parseInt(label[t].getTime())) {
                        values[t] += parseInt(zoomResult[r].sum_consumed_gas);
                        break;
                    }
                }
            }  

            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : parseInt(values[x])});
            }

            svg = d3.select("#gasPerHour");

            axis = d3.select("#gphAxis");

            seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, data, "date", "values");

            xTooltip = function(d, i) {
                return new Date(timestamps[i])
            }

            yTooltip = function(d, i) {
                return d + " Gas Consumed per Hour"
            }

            barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
        }) 
    } else {
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'consumed_gas');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'consumed_gas', conseiljs.ConseilOperator.GT, [0]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', conseiljs.ConseilFunction.sum);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

    d3.select("#gasPerHourLink").attr("href", shareReport("mainnet", "operations", query))

    console.log(result);

    label = [];
    timestamps = [];
    value = [];
    data = [];

    now = new Date().getTime()

    for(var time = new Date(date).getTime(); time < now; time += 3600000) {
        label.push(new Date(time));
        timestamps.push(time);
        value.push(0)
    }

    console.log(timestamps);
    
    for(var r = 0; r < result.length; r++) {
        for(var t = label.length - 1; t > 0; t--) {
            if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                value[t] += parseInt(result[r].sum_consumed_gas);
                break;
            }
        }
    }  

    for(var x = 0; x < value.length; x++) {
        data.push({date : label[x].getTime(), values : parseInt(value[x])});
    }

    svg = d3.select("#gasPerHour");

    axis = d3.select("#gphAxis");

    seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, data, "date", "values");

    xTooltip = function(d, i) {
        return new Date(timestamps[i])
    }

    yTooltip = function(d, i) {
        return d + " Gas Consumed per Hour"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
    }

    return 6;                                              
}

now = new Date();
now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
now.setMinutes(0, 0, 0);

now = now.getTime();

gphQuery(now - (3600000 * 168));
