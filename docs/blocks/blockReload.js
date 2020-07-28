d3.select("#blocksPageOptions").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#oneDay").on("click", function() {
    clearAllGraphs()
    prioritybphQuery(new Date().getTime() - 86400000);
    endorsementsPerBlockQuery(new Date().getTime() - 86400000);
    bphQuery(new Date().getTime() - 86400000);
    d3.select("#blocksPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#blocksPageOptions").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#oneWeek").on("click", function() {
    clearAllGraphs()
    prioritybphQuery(new Date().getTime() - 604800000);
    endorsementsPerBlockQuery(new Date().getTime() - 604800000);
    bphQuery(new Date().getTime() - 604800000);
    d3.select("#blocksPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#blocksPageOptions").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#oneMonth").on("click", function() {
    clearAllGraphs()
    prioritybphQuery(new Date().getTime() - 2629746000);
    endorsementsPerBlockQuery(new Date().getTime() - 2629746000);
    bphQuery(new Date().getTime() - 2629746000);
    d3.select("#blocksPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#blocksPageOptions").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#oneYear").on("click", function() {
    clearAllGraphs()
    prioritybphQuery(new Date().getTime() - 31556952000);
    endorsementsPerBlockQuery(new Date().getTime() - 31556952000);
    bphQuery(new Date().getTime() - 31556952000);
    d3.select("#blocksPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#blocksPageOptions").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#allTime").on("click", function() {
    clearAllGraphs()
    prioritybphQuery(1530316800000);
    endorsementsPerBlockQuery(1530316800000);
    bphQuery(1530316800000);
    d3.select("#blocksPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#blocksPageOptions").select("#allTime").style("background-color", "darkgrey")
});