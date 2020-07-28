
let accountQuery = async function(limit) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'balance');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'account_id');
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "balance", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'accounts', query);

    result.forEach(element => {
        element.balance = element.balance / 1000000.0
    });

    d3.select("#topAccountsLink").attr("href", shareReport("mainnet", "accounts", query))

    graphSVG = d3.select("#topAccounts");

    graphAxis = d3.select("#topAccountsAxis");

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

accountQuery(100);