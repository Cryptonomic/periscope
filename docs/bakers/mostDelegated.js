
let delegateQuery = async function(limit) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'account_id');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'delegate_value');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'delegate_value', conseiljs.ConseilOperator.ISNULL, [], true);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, "account_id", conseiljs.ConseilFunction.count);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "count_account_id", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'accounts', query);

    d3.select("#mostDelegatedLink").attr("href", shareReport("mainnet", "accounts", query))

    graphSVG = d3.select("#topDelegates");

    graphAxis = d3.select("#topDelegatesAxis");

    seperateAxisDynamicBarChartGenerator(500, 25, graphSVG, graphAxis, result, "delegate_value", "count_account_id");

    let getBaker = async function(delegate_value) {
        let apiData = await fetch("https://api.baking-bad.org/v2/bakers/" + delegate_value)
        if (apiData.status !== 200) {
            return delegate_value;
        }
        let jsonData = await apiData.json()
        return bakerNames[delegate_value] = jsonData["name"]
    }

    bakerNames = {}
    result.forEach(d => bakerNames[d.delegate_value] = getBaker(d.delegate_value))
    xTooltip = function(d, i) {
        if(typeof(bakerNames[result[i].delegate_value]) == "object") {
            return result[i].delegate_value
        }
        return bakerNames[result[i].delegate_value]
    }

    yTooltip = function(d, i) {
        return d + " Delegations"
    }

    barGraphFloatingTooltipGenerator(graphSVG, xTooltip, yTooltip)

    return result;                                              
}

delegateQuery(100);
