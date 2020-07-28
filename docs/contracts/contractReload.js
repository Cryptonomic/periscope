d3.select("#topContractsReload").on("click", function() {
    contractQuery(document.getElementById("topContractsNumber").value);
});

d3.select("#topInvokedReload").on("click", function() {
    invokedQuery(document.getElementById("topInvokedNumber").value, Math.round(new Date().getTime()) - 2929746000);
});

d3.select("#topInvokedOptions").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#topInvokedOptions").select("#oneDay").on("click", function() {
    clearGraph("#topInvoked")
    clearGraph("#topInvokedAxis")
    invokedQuery(document.getElementById("topInvokedNumber").value, new Date().getTime() - 86400000);
    d3.select("#topInvokedOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topInvokedOptions").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#topInvokedOptions").select("#oneWeek").on("click", function() {
    clearGraph("#topInvoked")
    clearGraph("#topInvokedAxis")
    invokedQuery(document.getElementById("topInvokedNumber").value, new Date().getTime() - 604800000);
    d3.select("#topInvokedOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topInvokedOptions").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#topInvokedOptions").select("#oneMonth").on("click", function() {
    clearGraph("#topInvoked")
    clearGraph("#topInvokedAxis")
    invokedQuery(document.getElementById("topInvokedNumber").value, new Date().getTime() - 2629746000);
    d3.select("#topInvokedOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topInvokedOptions").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#topInvokedOptions").select("#oneYear").on("click", function() {
    clearGraph("#topInvoked")
    clearGraph("#topInvokedAxis")
    invokedQuery(document.getElementById("topInvokedNumber").value, new Date().getTime() - 31556952000);
    d3.select("#topInvokedOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topInvokedOptions").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#topInvokedOptions").select("#allTime").on("click", function() {
    clearGraph("#topInvoked")
    clearGraph("#topInvokedAxis")
    invokedQuery(document.getElementById("topInvokedNumber").value, 1530316800000);
    d3.select("#topInvokedOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topInvokedOptions").select("#allTime").style("background-color", "darkgrey")
});