

let bakerQuery = async function(limit, date) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'baker');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'hash');
    query = conseiljs.ConseilQueryBuilder.addPredicate(query, 'timestamp', conseiljs.ConseilOperator.AFTER, [date]);
    query = conseiljs.ConseilQueryBuilder.addAggregationFunction(query, "hash", conseiljs.ConseilFunction.count);
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "count_hash", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'blocks', query);

    console.log(result)

    d3.select("#topBakersLink").attr("href", shareReport("mainnet", "blocks", query))

    graphSVG = d3.select("#topBakers");

    graphAxis = d3.select("#topBakersAxis");

    seperateAxisDynamicBarChartGenerator(500, 25, graphSVG, graphAxis, result, "baker", "count_hash");

    let getBaker = async function(baker) {
        let apiData = await fetch("https://api.baking-bad.org/v2/bakers/" + baker)
        if (apiData.status !== 200) {
            return baker;
        }
        let jsonData = await apiData.json()
        return bakerNames[baker] = jsonData["name"]
    }

    bakerNames = {}
    result.forEach(d => bakerNames[d.baker] = getBaker(d.baker))
    xTooltip = function(d, i) {
        if(typeof(bakerNames[result[i].baker]) == "object") {
            return result[i].baker
        }
        return bakerNames[result[i].baker]
    }

    yTooltip = function(d, i) {
        return d + " Blocks Baked"
    }

    barGraphFloatingTooltipGenerator(graphSVG, xTooltip, yTooltip)

    return result;                                              
}

bakerQuery(100, Math.round(new Date().getTime()) - 2929746000);

d3.select("#blockReload").on("click", function() {
    bakerQuery(document.getElementById("number").value, new Date(document.getElementById("blockDate").value).getTime());
});