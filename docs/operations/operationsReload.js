d3.select("#operationsPageOptions").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#oneDay").on("click", function() {
    tphQuery(new Date().getTime() - 86400000);
    vphQuery(new Date().getTime() - 86400000);
    gphQuery(new Date().getTime() - 86400000);
    fphQuery(new Date().getTime() - 86400000);
    apdQuery(new Date().getTime() - 86400000);
    opdQuery(new Date().getTime() - 86400000);
    d3.select("#operationsPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#operationsPageOptions").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#oneWeek").on("click", function() {
    tphQuery(new Date().getTime() - 604800000);
    vphQuery(new Date().getTime() - 604800000);
    gphQuery(new Date().getTime() - 604800000);
    fphQuery(new Date().getTime() - 604800000);
    apdQuery(new Date().getTime() - 604800000);
    opdQuery(new Date().getTime() - 604800000);
    d3.select("#operationsPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#operationsPageOptions").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#oneMonth").on("click", function() {
    tphQuery(new Date().getTime() - 2629746000);
    vphQuery(new Date().getTime() - 2629746000);
    gphQuery(new Date().getTime() - 2629746000);
    fphQuery(new Date().getTime() - 2629746000);
    apdQuery(new Date().getTime() - 2629746000);
    opdQuery(new Date().getTime() - 2629746000);
    d3.select("#operationsPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#operationsPageOptions").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#oneYear").on("click", function() {
    tphQuery(new Date().getTime() - 31556952000);
    vphQuery(new Date().getTime() - 31556952000);
    gphQuery(new Date().getTime() - 31556952000);
    fphQuery(new Date().getTime() - 31556952000);
    apdQuery(new Date().getTime() - 31556952000);
    opdQuery(new Date().getTime() - 31556952000);
    d3.select("#operationsPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#operationsPageOptions").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#allTime").on("click", function() {
    tphQuery(1530316800000);
    vphQuery(1530316800000);
    gphQuery(1530316800000);
    fphQuery(1530316800000);
    apdQuery(1530316800000);
    opdQuery(1530316800000);
    d3.select("#operationsPageOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#operationsPageOptions").select("#allTime").style("background-color", "darkgrey")
});