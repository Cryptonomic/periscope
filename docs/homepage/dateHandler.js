now = new Date();
now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
now.setMinutes(0, 0, 0);
now = now.getTime();

gasSpentPerHourQuery(now - (3600000 * 168));
transactionVolumePerHourQuery(now - (3600000 * 168));
transactionsPerHourQuery(now - (3600000 * 168));
priorityZeroBlocksPerHourQuery(now - (604800000));
blocksPerHourQuery(now - (604800000));
endorsementsPerBlockQuery(now - 86400000)

// Date Event Listeners for Blocks per Hour
d3.select("#blocksPerHourDates").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#blocksPerHourDates").select("#oneDay").on("click", function() {
    clearGraph("#blocksPerHour")
    clearGraph("#blocksPerHourAxis")
    blocksPerHourQuery(new Date().getTime() - 86400000);
    d3.select("#blocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#blocksPerHourDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#blocksPerHourDates").select("#oneWeek").on("click", function() {
    clearGraph("#blocksPerHour")
    clearGraph("#blocksPerHourAxis")
    blocksPerHourQuery(new Date().getTime() - 604800000);
    d3.select("#blocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#blocksPerHourDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#blocksPerHourDates").select("#oneMonth").on("click", function() {
    clearGraph("#blocksPerHour")
    clearGraph("#blocksPerHourAxis")
    blocksPerHourQuery(new Date().getTime() - 2629746000);
    d3.select("#blocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#blocksPerHourDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#blocksPerHourDates").select("#oneYear").on("click", function() {
    clearGraph("#blocksPerHour")
    clearGraph("#blocksPerHourAxis")
    blocksPerHourQuery(new Date().getTime() - 31556952000);
    d3.select("#blocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#blocksPerHourDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#blocksPerHourDates").select("#allTime").on("click", function() {
    clearGraph("#blocksPerHour")
    clearGraph("#blocksPerHourAxis")
    blocksPerHourQuery(1530316800000);
    d3.select("#blocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#blocksPerHourDates").select("#allTime").style("background-color", "darkgrey")
});

// Date Event Listeners for Priority Zero Blocks per Hour
d3.select("#priorityZeroBlocksPerHourDates").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#priorityZeroBlocksPerHourDates").select("#oneDay").on("click", function() {
    clearGraph("#priorityZeroBlocksPerHour")
    clearGraph("#priorityZeroBlocksPerHourAxis")
    priorityZeroBlocksPerHourQuery(new Date().getTime() - 86400000);
    d3.select("#priorityZeroBlocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#priorityZeroBlocksPerHourDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#priorityZeroBlocksPerHourDates").select("#oneWeek").on("click", function() {
    clearGraph("#priorityZeroBlocksPerHour")
    clearGraph("#priorityZeroBlocksPerHourAxis")
    priorityZeroBlocksPerHourQuery(new Date().getTime() - 604800000);
    d3.select("#priorityZeroBlocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#priorityZeroBlocksPerHourDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#priorityZeroBlocksPerHourDates").select("#oneMonth").on("click", function() {
    clearGraph("#priorityZeroBlocksPerHour")
    clearGraph("#priorityZeroBlocksPerHourAxis")
    priorityZeroBlocksPerHourQuery(new Date().getTime() - 2629746000);
    d3.select("#priorityZeroBlocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#priorityZeroBlocksPerHourDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#priorityZeroBlocksPerHourDates").select("#oneYear").on("click", function() {
    clearGraph("#priorityZeroBlocksPerHour")
    clearGraph("#priorityZeroBlocksPerHourAxis")
    priorityZeroBlocksPerHourQuery(new Date().getTime() - 31556952000);
    d3.select("#priorityZeroBlocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#priorityZeroBlocksPerHourDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#priorityZeroBlocksPerHourDates").select("#allTime").on("click", function() {
    clearGraph("#priorityZeroBlocksPerHour")
    clearGraph("#priorityZeroBlocksPerHourAxis")
    priorityZeroBlocksPerHourQuery(1530316800000);
    d3.select("#priorityZeroBlocksPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#priorityZeroBlocksPerHourDates").select("#allType").style("background-color", "darkgrey")
});


d3.select("#endorsementsPerBlockDates").select("#oneDay").style("background-color", "darkgrey")

d3.select("#endorsementsPerBlockDates").select("#oneDay").on("click", function() {
    clearGraph("#endorsementsPerBlock")
    clearGraph("#endorsementsPerBlockAxis")
    endorsementsPerBlockQuery(new Date().getTime() - 86400000);
    d3.select("#endorsementsPerBlockDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#endorsementsPerBlockDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#endorsementsPerBlockDates").select("#oneWeek").on("click", function() {
    clearGraph("#endorsementsPerBlock")
    clearGraph("#endorsementsPerBlockAxis")
    endorsementsPerBlockQuery(new Date().getTime() - 604800000);
    d3.select("#endorsementsPerBlockDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#endorsementsPerBlockDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#endorsementsPerBlockDates").select("#oneMonth").on("click", function() {
    clearGraph("#endorsementsPerBlock")
    clearGraph("#endorsementsPerBlockAxis")
    endorsementsPerBlockQuery(new Date().getTime() - 2629746000);
    d3.select("#endorsementsPerBlockDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#endorsementsPerBlockDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#endorsementsPerBlockDates").select("#oneYear").on("click", function() {
    clearGraph("#endorsementsPerBlock")
    clearGraph("#endorsementsPerBlockAxis")
    endorsementsPerBlockQuery(new Date().getTime() - 31556952000);
    d3.select("#endorsementsPerBlockDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#endorsementsPerBlockDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#endorsementsPerBlockDates").select("#allTime").on("click", function() {
    clearGraph("#endorsementsPerBlock")
    clearGraph("#endorsementsPerBlockAxis")
    endorsementsPerBlockQuery(1530316800000);
    d3.select("#endorsementsPerBlockDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#endorsementsPerBlockDates").select("#allTime").style("background-color", "darkgrey")
});

// Date Event Listeners for Transactions Per Hour
d3.select("#transactionsPerHourDates").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#transactionsPerHourDates").select("#oneDay").on("click", function() {
    clearGraph("#transactionsPerHour")
    clearGraph("#transactionsPerHourAxis")
    transactionsPerHourQuery(new Date().getTime() - 86400000);
    d3.select("#transactionsPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionsPerHourDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#transactionsPerHourDates").select("#oneWeek").on("click", function() {
    clearGraph("#transactionsPerHour")
    clearGraph("#transactionsPerHourAxis")
    transactionsPerHourQuery(new Date().getTime() - 604800000);
    d3.select("#transactionsPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionsPerHourDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#transactionsPerHourDates").select("#oneMonth").on("click", function() {
    clearGraph("#transactionsPerHour")
    clearGraph("#transactionsPerHourAxis")
    transactionsPerHourQuery(new Date().getTime() - 2629746000);
    d3.select("#transactionsPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionsPerHourDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#transactionsPerHourDates").select("#oneYear").on("click", function() {
    clearGraph("#transactionsPerHour")
    clearGraph("#transactionsPerHourAxis")
    transactionsPerHourQuery(new Date().getTime() - 31556952000);
    d3.select("#transactionsPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionsPerHourDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#transactionsPerHourDates").select("#allTime").on("click", function() {
    clearGraph("#transactionsPerHour")
    clearGraph("#transactionsPerHourAxis")
    transactionsPerHourQuery(1530316800000);
    d3.select("#transactionsPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionsPerHourDates").select("#allTime").style("background-color", "darkgrey")
});

// Date Event Listeners for Volume Per Hour
d3.select("#transactionVolumePerHourDates").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#transactionVolumePerHourDates").select("#oneDay").on("click", function() {
    clearGraph("#transactionVolumePerHour")
    clearGraph("#transactionVolumePerHourAxis")
    transactionVolumePerHourQuery(new Date().getTime() - 86400000);
    d3.select("#transactionVolumePerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionVolumePerHourDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#transactionVolumePerHourDates").select("#oneWeek").on("click", function() {
    clearGraph("#transactionVolumePerHour")
    clearGraph("#transactionVolumePerHourAxis")
    transactionVolumePerHourQuery(new Date().getTime() - 604800000);
    d3.select("#transactionVolumePerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionVolumePerHourDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#transactionVolumePerHourDates").select("#oneMonth").on("click", function() {
    clearGraph("#transactionVolumePerHour")
    clearGraph("#transactionVolumePerHourAxis")
    transactionVolumePerHourQuery(new Date().getTime() - 2629746000);
    d3.select("#transactionVolumePerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionVolumePerHourDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#transactionVolumePerHourDates").select("#oneYear").on("click", function() {
    clearGraph("#transactionVolumePerHour")
    clearGraph("#transactionVolumePerHourAxis")
    transactionVolumePerHourQuery(new Date().getTime() - 31556952000);
    d3.select("#transactionVolumePerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionVolumePerHourDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#transactionVolumePerHourDates").select("#allTime").on("click", function() {
    clearGraph("#transactionVolumePerHour")
    clearGraph("#transactionVolumePerHourAxis")
    transactionVolumePerHourQuery(1530316800000);
    d3.select("#transactionVolumePerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#transactionVolumePerHourDates").select("#allTime").style("background-color", "darkgrey")
});

// Date Event Listeners for Gas Spent per Hour
d3.select("#gasSpentPerHourDates").select("#oneWeek").style("background-color", "darkgrey")

d3.select("#gasSpentPerHourDates").select("#oneDay").on("click", function() {
    clearGraph("#gasSpentPerHour")
    clearGraph("#gasSpentPerHourAxis")
    gasSpentPerHourQuery(new Date().getTime() - 86400000);
    d3.select("#gasSpentPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#gasSpentPerHourDates").select("#oneDay").style("background-color", "darkgrey")
});

d3.select("#gasSpentPerHourDates").select("#oneWeek").on("click", function() {
    clearGraph("#gasSpentPerHour")
    clearGraph("#gasSpentPerHourAxis")
    gasSpentPerHourQuery(new Date().getTime() - 604800000);
    d3.select("#gasSpentPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#gasSpentPerHourDates").select("#oneWeek").style("background-color", "darkgrey")
});

d3.select("#gasSpentPerHourDates").select("#oneMonth").on("click", function() {
    clearGraph("#gasSpentPerHour")
    clearGraph("#gasSpentPerHourAxis")
    gasSpentPerHourQuery(new Date().getTime() - 2629746000);
    d3.select("#gasSpentPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#gasSpentPerHourDates").select("#oneMonth").style("background-color", "darkgrey")
});

d3.select("#gasSpentPerHourDates").select("#oneYear").on("click", function() {
    clearGraph("#gasSpentPerHour")
    clearGraph("#gasSpentPerHourAxis")
    gasSpentPerHourQuery(new Date().getTime() - 31556952000);
    d3.select("#gasSpentPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#gasSpentPerHourDates").select("#oneYear").style("background-color", "darkgrey")
});

d3.select("#gasSpentPerHourDates").select("#allTime").on("click", function() {
    clearGraph("#gasSpentPerHour")
    clearGraph("#gasSpentPerHourAxis")
    gasSpentPerHourQuery(1530316800000);
    d3.select("#gasSpentPerHourDates").selectAll(".date").style("background-color", "lightgrey")
    d3.select("#gasSpentPerHourDates").select("#allTime").style("background-color", "darkgrey")
});