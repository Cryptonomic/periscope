
let contractQuery = async function(limit) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'balance');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'account_id');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'account_id', conseiljs.ConseilOperator.STARTSWITH, ["KT1"]);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "balance", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'accounts', query);

    result.forEach(element => {
        element.balance = element.balance / 1000000.0
    });

    d3.select("#topContractsLink").attr("href", shareReport("mainnet", "accounts", query))

    graphSVG = d3.select("#topContracts");

    graphAxis = d3.select("#topContractsAxis");

    seperateAxisDynamicBarChartGenerator(500, 25, graphSVG, graphAxis, result, "account_id", "balance");

    xTooltip = function(d, i) {
        return result[i].account_id
    }

    yTooltip = function(d, i) {
        return d + " ꜩ"
    }

    barGraphFloatingTooltipGenerator(graphSVG, xTooltip, yTooltip)

    return result;
}

contractQuery(100);