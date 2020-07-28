
let blocksPerHourQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'hash');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'blocks', query);

    d3.select("#blocksPerHourLink").attr("href", shareReport("mainnet", "blocks", query))

    console.log(result);

    label = [];
    timestamps = [];
    values = [];
    data = [];

    now = new Date().getTime();

    for(var time = new Date(date).getTime(); time < now; time += 3600000) {
        label.push(new Date(time));
        timestamps.push(time);
        values.push(0)
    }

    for(var t = 0; t < label.length; t++) {
        while(result.length > 0 && parseInt(result[0].timestamp) < parseInt(label[t].getTime())) {
            values[t] += 1;
            result.shift()
        }
    }

    for(var x = 0; x < values.length; x++) {
        data.push({date : label[x].getTime(), value : parseInt(values[x])});
    }

    svg = d3.select("#blocksPerHour");

    axis = d3.select("#blocksPerHourAxis");

    // temporalLineGraphGenerator(500, 1200, svg, label, data, "date", "value");

    seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "value", 20, "darkslategrey");

    xTooltip = function(d, i) {
        return new Date(timestamps[i])
    }

    yTooltip = function(d, i) {
        return d + " Blocks per Hour"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

    return result;
}

let priorityZeroBlocksPerHourQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'hash');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'priority', conseiljs.ConseilOperator.EQ, [0]);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'blocks', query);

    d3.select("#priorityZeroBlocksPerHourLink").attr("href", shareReport("mainnet", "blocks", query))

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

    svg = d3.select("#priorityZeroBlocksPerHour");

    axis = d3.select("#priorityZeroBlocksPerHourAxis");

    // temporalLineGraphGenerator(500, 1200, svg, label, data, "date", "value");

    seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "value", 20, "darkslategrey");

    xTooltip = function(d, i) {
        return new Date(timestamps[i])
    }

    yTooltip = function(d, i) {
        return d + " Priority Zero Blocks per Hour"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

    return result;
}

let transactionsPerHourQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    if(new Date().getTime() - date > 31000000000) {
        d3.select("#transactionsPerHourTitle").html("Transactions per Cycle")

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

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, result, "cycle", "count_kind", 100, "darkslategrey");

        xTooltip = function(d, i) {
            return "Cycle " + result[i].cycle
        }

        yTooltip = function(d, i) {
            return d + " Transactions per Cycle"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

        svg.selectAll("g").on("click", async function(d, i) {
            d3.select("#transactionsPerHourTitle").html(`Transactions per Hour in Cycle ${result[i].cycle}`)

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

            seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 20, "darkSlateGrey");

            xTooltip = function(d, i) {
                return new Date(timestamps[i])
            }

            yTooltip = function(d, i) {
                return d + " Transactions per Hour"
            }

            barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
        })
    } else {
        d3.select("#transactionsPerHourTitle").html("Transactions per Hour")

        query = conseiljs.ConseilQueryBuilder.addFields(query, 'kind');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'kind', conseiljs.ConseilFunction.count);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#transactionsPerHourLink").attr("href", shareReport("mainnet", "operations", query))

        console.log(result);

        label = [];
        timestamps = [];
        values = [];
        data = [];

        now = new Date().getTime()

        for(var time = new Date(date).getTime(); time < now; time += 3600000) {
            label.push(new Date(time));
            timestamps.push(time);
            values.push(0)
        }

        console.log(timestamps);

        for(var r = 0; r < result.length; r++) {
            for(var t = label.length - 1; t > 0; t--) {
                if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                    values[t] += parseInt(result[r].count_kind);
                    break;
                }
            }
        }

        for(var x = 0; x < values.length; x++) {
            data.push({date : label[x].getTime(), values : parseInt(values[x])});
        }

        svg = d3.select("#transactionsPerHour");

        axis = d3.select("#tphAxis");

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 0, "darkslategrey");

        xTooltip = function(d, i) {
            return new Date(timestamps[i])
        }

        yTooltip = function(d, i) {
            return d + " Transactions per Hour"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
    }



    return 4;
}

let transactionVolumePerHourQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    if(new Date().getTime() - date > 31000000000) {
        d3.select("#transactionVolumePerHourTitle").html("Transaction Volume per Cycle")

        query = conseiljs.ConseilQueryBuilder.addFields(query, 'amount');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'cycle');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'amount', conseiljs.ConseilFunction.sum);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "cycle", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#transactionVolumePerHourLink").attr("href", shareReport("mainnet", "operations", query))

        svg = d3.select("#transactionVolumePerHour");

        axis = d3.select("#transactionVolumePerHourAxis");

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, result, "cycle", "sum_amount", 0, "darkslategrey");

        xTooltip = function(d, i) {
            return "Cycle " + result[i].cycle
        }

        yTooltip = function(d, i) {
            return d + "ꜩ in Transaction Volume per Cycle"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

        svg.selectAll("g").on("click", async function(d, i) {
            d3.select("#transactionVolumePerHourTitle").html(`Transaction Volume per Hour in Cycle ${result[i].cycle}`)

            query = conseiljs.ConseilQueryBuilder.blankQuery();
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'amount');
            query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
            query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'cycle', conseiljs.ConseilOperator.EQ, [result[i].cycle]);
            query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'amount', conseiljs.ConseilFunction.sum);
            query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
            query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

            const zoomResult = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

            d3.select("#transactionVolumePerHourLink").attr("href", shareReport("mainnet", "operations", query))

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
                        values[t] += parseInt(zoomResult[r].sum_amount);
                        break;
                    }
                }
            }

            for(var x = 0; x < values.length; x++) {
                data.push({date : label[x].getTime(), values : parseFloat(values[x] / 1000000.0)});
            }

            svg = d3.select("#transactionVolumePerHour");

            axis = d3.select("#transactionVolumePerHourAxis");

            seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 0, "darkSlateGrey");

            xTooltip = function(d, i) {
                return new Date(timestamps[i])
            }

            yTooltip = function(d, i) {
                return d + "ꜩ in Transaction Volume per Hour"
            }

            barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
        })
    } else {
        d3.select("#transactionVolumePerHourTitle").html("Transaction Volume per Hour")

        query = conseiljs.ConseilQueryBuilder.addFields(query, 'amount');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ['transaction']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'amount', conseiljs.ConseilFunction.sum);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#transactionVolumePerHourLink").attr("href", shareReport("mainnet", "operations", query))

        label = [];
        timestamps = [];
        values = [];
        data = [];

        now = new Date().getTime()

        for(var time = new Date(date).getTime(); time < now; time += 3600000) {
            label.push(new Date(time));
            timestamps.push(time);
            values.push(0)
        }

        console.log(timestamps);

        for(var r = 0; r < result.length; r++) {
            for(var t = label.length - 1; t > 0; t--) {
                if(parseInt(result[r].timestamp) > parseInt(label[t].getTime())) {
                    values[t] += parseInt(result[r].sum_amount);
                    break;
                }
            }
        }

        for(var x = 0; x < values.length; x++) {
            data.push({date : label[x].getTime(), values : parseFloat(values[x] / 1000000.)});
        }

        svg = d3.select("#transactionVolumePerHour");

        axis = d3.select("#transactionVolumePerHourAxis");

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 0, "darkslategrey");

        xTooltip = function(d, i) {
            return new Date(timestamps[i])
        }

        yTooltip = function(d, i) {
            return d + "ꜩ in Transaction Volume per Hour"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
    }

    return 4;
}

let gasSpentPerHourQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    if(new Date().getTime() - date > 31000000000) {
        d3.select("#gasSpentPerHourTitle").html("Gas Consumed per Cycle")

        query = conseiljs.ConseilQueryBuilder.addFields(query, 'consumed_gas');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'cycle');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'consumed_gas', conseiljs.ConseilOperator.GT, [0]);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', conseiljs.ConseilFunction.sum);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "cycle", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#gasSpentPerHourLink").attr("href", shareReport("mainnet", "operations", query))

        svg = d3.select("#gasSpentPerHour");

        axis = d3.select("#gasSpentPerHourAxis");

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, result, "cycle", "sum_consumed_gas", 0, "darkslategrey");

        xTooltip = function(d, i) {
            return "Cycle " + result[i].cycle
        }

        yTooltip = function(d, i) {
            return d + " Gas Consumed per Cycle"
        }

        barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)

        svg.selectAll("g").on("click", async function(d, i) {
            d3.select("#gasSpentPerHourTitle").html(`Gas Consumed per Hour in Cycle ${result[i].cycle}`)

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

            d3.select("#gasSpentPerHourLink").attr("href", shareReport("mainnet", "operations", query))

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

            svg = d3.select("#gasSpentPerHour");

            axis = d3.select("#gasSpentPerHourAxis");

            seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 0, "darkslategrey");

            xTooltip = function(d, i) {
                return new Date(timestamps[i])
            }

            yTooltip = function(d, i) {
                return d + " Gas Consumed per Hour"
            }

            barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
        })
    } else {
        d3.select("#gasSpentPerHourTitle").html("Gas Consumed per Hour")

        query = conseiljs.ConseilQueryBuilder.addFields(query, 'consumed_gas');
        query = conseiljs.ConseilQueryBuilder.addFields(query, 'timestamp');
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'consumed_gas', conseiljs.ConseilOperator.GT, [0]);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ['applied']);
        query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
        query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, 'consumed_gas', conseiljs.ConseilFunction.sum);
        query = conseiljs.ConseilQueryBuilder.addOrdering(query, "timestamp", conseiljs.ConseilSortDirection.ASC);
        query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

        const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

        d3.select("#gasSpentPerHourLink").attr("href", shareReport("mainnet", "operations", query))

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

        svg = d3.select("#gasSpentPerHour");

        axis = d3.select("#gasSpentPerHourAxis");

        seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, data, "date", "values", 0, "darkslategrey");

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

let endorsementsPerBlockQuery = async function(date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();

    query = conseiljs.ConseilQueryBuilder.addFields(query, "block_level", "kind");
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.BETWEEN, [date, new Date().getTime()]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, "kind", conseiljs.ConseilOperator.EQ, ["endorsement"]);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, "kind", conseiljs.ConseilFunction.count);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "block_level", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, 1000000000);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

    console.log(result)

    d3.select("#endorsementsPerBlockLink").attr("href", shareReport("mainnet", "operations", query))

    svg = d3.select("#endorsementsPerBlock");

    axis = d3.select("#endorsementsPerBlockAxis");

    seperateAxisDynamicBarChartGenerator(300, 5, svg, axis, result, "block_level", "count_kind", 0, "darkslategrey");

    xTooltip = function(d, i) {
        return "Block Level " + (result[i]["block_level"] - 1)
    }

    yTooltip = function(d, i) {
        return d + " Endorsements"
    }

    barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip)
}
