let stakeQuery = async function(limit) {
    let query = conseiljs.ConseilQueryBuilder.blankQuery();
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'pkh');
    query = conseiljs.ConseilQueryBuilder.addFields(query, 'staking_balance');
    query = conseiljs.ConseilQueryBuilder.addOrdering(query, "staking_balance", conseiljs.ConseilSortDirection.DESC);
    query = conseiljs.ConseilQueryBuilder.setLimit(query, limit);

    const result = await conseiljs.ConseilDataClient.executeEntityQuery(conseilServer, 'tezos', conseilServer.network, 'bakers', query);

    result.forEach(element => {
        element.staking_balance = element.staking_balance / 1000000.0
    });

    d3.select("#topStakersLink").attr("href", shareReport("mainnet", "delegates", query))

    graphSVG = d3.select("#topStakers");

    graphAxis = d3.select("#topStakersAxis");

    seperateAxisDynamicBarChartGenerator(500, 25, graphSVG, graphAxis, result, "pkh", "staking_balance");

    let getBaker = async function(pkh) {
        let apiData = await fetch("https://api.baking-bad.org/v2/bakers/" + pkh)
        if (apiData.status !== 200) {
            return pkh;
        }
        let jsonData = await apiData.json()
        return bakerNames[pkh] = jsonData["name"]
    }

    bakerNames = {}
    result.forEach(d => bakerNames[d.pkh] = getBaker(d.pkh))
    xTooltip = function(d, i) {
        if(typeof(bakerNames[result[i].pkh]) == "object") {
            return result[i].pkh
        }
        return bakerNames[result[i].pkh]
    }

    yTooltip = function(d, i) {
        return d + " ꜩ Staking Balance"
    }

    barGraphFloatingTooltipGenerator(graphSVG, xTooltip, yTooltip)

    return result;
}

stakeQuery(100);
