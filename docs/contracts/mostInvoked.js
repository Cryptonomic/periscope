
let invokedQuery = async function(limit, date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'destination');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'operation_group_hash');
    // query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'source', conseiljs.ConseilOperator.STARTSWITH, ["KT1"]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'kind', conseiljs.ConseilOperator.EQ, ["transaction"]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'status', conseiljs.ConseilOperator.EQ, ["applied"]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.AFTER, [date]);
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'parameters', conseiljs.ConseilOperator.ISNULL, [], true);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, "operation_group_hash", conseiljs.ConseilFunction.count);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "count_operation_group_hash", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'operations', query);

    d3.select("#mostInvokedLink").attr("href", shareReport("mainnet", "operations", query))

    graphSVG = d3.select("#topInvoked");

    graphAxis = d3.select("#topInvokedAxis");

    seperateAxisDynamicBarChartGenerator(500, 25, graphSVG, graphAxis, result, "destination", "count_operation_group_hash");

    xTooltip = function(d, i) {
        return result[i].destination
    }

    yTooltip = function(d, i) {
        return d + " Invocations"
    }

    barGraphFloatingTooltipGenerator(graphSVG, xTooltip, yTooltip)

    return result;                                              
}

invokedQuery(100, Math.round(new Date().getTime()) - 2929746000);

d3.select("#invokedButtons").select("#oneDay").on("click", function() {
    clearGraph("topInvoked");
    clearGraph("topInvokedAxis");
    invokedQuery(document.getElementById("number").value, new Date().getTime() - 86400000);
});

d3.select("#invokedButtons").select("#oneWeek").on("click", function() {
    clearGraph("topInvoked");
    clearGraph("topInvokedAxis");
    invokedQuery(document.getElementById("number").value, new Date().getTime() - 604800000);
});

d3.select("#invokedButtons").select("#oneMonth").on("click", function() {
    clearGraph("topInvoked");
    clearGraph("topInvokedAxis");
    invokedQuery(document.getElementById("number").value, new Date().getTime() - 2629746000);
});

d3.select("#invokedButtons").select("#oneYear").on("click", function() {
    clearGraph("topInvoked");
    clearGraph("topInvokedAxis");
    invokedQuery(document.getElementById("number").value, new Date().getTime() - 31556952000);
});

d3.select("#invokedButtons").select("#allTime").on("click", function() {
    clearGraph("topInvoked");
    clearGraph("topInvokedAxis");
    invokedQuery(document.getElementById("number").value, 0);
});