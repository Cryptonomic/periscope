d3.select("#topStakersReload").on("click", function() {
    stakeQuery(document.getElementById("topStakersNumber").value);
});

d3.select("#topDelegatesReload").on("click", function () {
    delegateQuery(document.getElementById("topDelegatesNumber").value);

})

d3.select("#topBakersOptions").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#topBakersOptions").select("#oneDay").on("click", function() {
    clearGraph("#topBakers")
    clearGraph("#topBakersAxis")
    bakerQuery(document.getElementById("topBakersNumber").value, new Date().getTime() - 86400000);
    d3.select("#topBakersOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topBakersOptions").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#topBakersOptions").select("#oneWeek").on("click", function() {
    clearGraph("#topBakers")
    clearGraph("#topBakersAxis")
    bakerQuery(document.getElementById("topBakersNumber").value, new Date().getTime() - 604800000);
    d3.select("#topBakersOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topBakersOptions").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#topBakersOptions").select("#oneMonth").on("click", function() {
    clearGraph("#topBakers")
    clearGraph("#topBakersAxis")
    bakerQuery(document.getElementById("topBakersNumber").value, new Date().getTime() - 2629746000);
    d3.select("#topBakersOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topBakersOptions").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#topBakersOptions").select("#oneYear").on("click", function() {
    clearGraph("#topBakers")
    clearGraph("#topBakersAxis")
    bakerQuery(document.getElementById("topBakersNumber").value, new Date().getTime() - 31556952000);
    d3.select("#topBakersOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topBakersOptions").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#topBakersOptions").select("#allTime").on("click", function() {
    clearGraph("#topBakers")
    clearGraph("#topBakersAxis")
    bakerQuery(document.getElementById("topBakersNumber").value, 1530316800000);
    d3.select("#topBakersOptions").selectAll(".wideChartOption").style("background-color", "lightgrey")
    d3.select("#topBakersOptions").select("#allTime").style("background-color", "darkgrey")
});