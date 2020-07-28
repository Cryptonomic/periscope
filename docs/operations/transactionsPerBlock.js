
let tphQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    if(new Date().getTime() - date > 31000000000) {
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'kind');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'cycle');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "cycle", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#transactionsPerHourLink").attr("href", shareReport("mainnet", "operations", query))

        svg = d3.select("#transactionsPerHour");

        axis = d3.select("#tphAxis");

        seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, result, "cycle", "count_kind");

        xTooltip = function(d, i) {
            return "Cycle " + result[i].cycle
        }

        yTooltip = function(d, i) {
            return d + " Transactions per Cycle"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

        svg.selectAll("g").on("click", async function(d, i) {
            console.log("clock");
            

            query = conseiljs.ConseilQueryBuilder.blankQuery();
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'kind');
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'cycle', conseiljs.ConseilOperator.EQ, [result[i].cycle]);
            query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
            query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
            query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

            const zoomResult = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

            d3.select("#transactionsPerHourLink").attr("href", shareReport("mainnet", "operations", query))

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
                        values[t] += parseInt(zoomResult[r].count_kind);
                        break;
                    }
                }
            }  

            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : parseInt(values[x])});
            }

            svg = d3.select("#transactionsPerHour");

            axis = d3.select("#tphAxis");

            seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, data, "date", "values");

            xTooltip = function(d, i) {
                return new Date(timestamps[i])
            }

            yTooltip = function(d, i) {
                return d + " Transactions per Hour"
            }

            barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
        }) 
    } else {
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'kind');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'block_level');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "block_level", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#transactionsPerHourLink").attr("href", shareReport("mainnet", "operations", query))

        console.log(result);

        // label = [];
        // timestamps = [];
        // values = [];
        // data = [];
        //
        // now = new Date().getTime()
        //
        // for(var time = new Date(date).getTime(); time < now; time += 3600000) {
        //     label.push(new Date(time));
        //     timestamps.push(time);
        //     values.push(0)
        // }
        //
        // console.log(timestamps);
        //
        // for(var r = 0; r < result.length; r++) {
        //     for(var t = label.length - 1; t > 0; t--) {
        //         if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
        //             values[t] += parseInt(result[r].count_kind);
        //             break;
        //         }
        //     }
        // }
        //
        // for(var x = 0; x < values.length; x++) {
        //     data.push({date : label[x].getTime(), values : parseInt(values[x])});
        // }

        svg = d3.select("#transactionsPerHour");

        axis = d3.select("#tphAxis");

        seperateAxisPrioritizedBarChartGenerator(500, 1200, svg, axis, result, "block_level", "count_kind");

        xTooltip = function(d, i) {
            return result[i].block_level
        }

        yTooltip = function(d, i) {
            return d + " Transactions per Block "
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
    }

    

    return 4;                                              
}

now = new Date();
now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
now.setMinutes(0, 0, 0);

now = now.getTime();

tphQuery(now - (3600000 * 168));
