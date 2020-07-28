const clearAllGraphs = function() {
    d3.selectAll("svg").selectAll("*").remove();
}

const clearGraph = function(selector) {
    d3.select(selector).selectAll("*").remove();
}


const seperateAxisStaticBarChartGenerator = function(height, width, graphSVGElement, axisSVGElement, queryResult, xAxisKey, yAxisKey) {
    
    // Clear SVG Elements of old data
    graphSVGElement.selectAll("*").remove();
    axisSVGElement.selectAll("*").remove();

    // Create an Array for each Axis
    xAxisData = queryResult.map(d => d[xAxisKey]);
    yAxisData = queryResult.map(d => d[yAxisKey]);

    // Create a D3 Linear Scale for the Y-Axis
    yScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData)])
        .range([0, height]);

    // Create a D3 Linear Scale for the Y-Axis Label
    // We negate the height here so that the bars are drawn correctly
    yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData)])
        .range([0, -height]);

    // Create a D3 Band Scale for the X-Axis
    // A static SVG will have a fixed size no matter the number of elements
    // Here, the width parameter is treated as the width of each bar in the graph
    xScale = d3.scaleBand()
        .domain(d3.range(xAxisData.length))
        .range([0, width]);

    // Setup SVG element attributes 
    graphSVGElement
        .attr("height", height)
        .attr("width", width)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");
    
    // Create selection for bar graph bars
    const bar = graphSVGElement.selectAll("g")
        .data(yAxisData) //Attach bars to Y-Axis data
        .join("g")
            .attr("transform", (d, i) => `translate(${xScale(i) + 115}, ${height - yScale(d)})`);

    // Add a rectangle to the bar element
    bar.append("rect")
        .attr("fill", "purple")
        .attr("width", xScale.bandwidth() - 1) // Sets a padding of one pixel between bars
        .attr("height", yScale);
    
    // // Create startup transition
    // bar.selectAll("rect")
    //     .transition()
    //     .duration(800) // 800 milliseconds to transition from height 0 to the correct height
    //     .attr("height", yScale);

    // Create a Y-Axis Scale
    const yAxis = d3.axisLeft()
        .scale(yAxisScale);

    // Prepare the Y-Axis Element
    axisSVGElement
        .attr("height", height)
        .attr("class", "axis");

    // Attach the axis to the SVG Element
    axisSVGElement
        .append("g")
            .attr("transform", `translate(100, ${height})`)
            .style("color", "black")
            .call(yAxis);
}

const seperateAxisPrioritizedBarChartGenerator = function(height, width, graphSVGElement, axisSVGElement, queryResult, xAxisKey, yAxisKey, axisWidth = 100, barColor = "black") {
    
    // Clear SVG Elements of old data
    graphSVGElement.selectAll("*").remove();
    axisSVGElement.selectAll("*").remove();

    // Create an Array for each Axis
    xAxisData = queryResult.map(d => parseFloat(d[xAxisKey]));
    yAxisData = queryResult.map(d => parseFloat(d[yAxisKey]));

    // Create a D3 Linear Scale for the Y-Axis
    yScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData)])
        .range([0, height]);

    // Create a D3 Linear Scale for the Y-Axis Label
    // We negate the height here so that the bars are drawn correctly
    yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData)])
        .range([0, -height]);

    // Create a D3 Band Scale for the X-Axis
    // A static SVG will have a fixed size no matter the number of elements
    // Here, the width parameter is treated as the width of each bar in the graph
    xScale = d3.scaleBand()
        .domain(d3.range(xAxisData.length))
        .range([0, width]);

    // Setup SVG element attributes 
    graphSVGElement
        .attr("height", height)
        .attr("width", width)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");
        
    if(xScale.bandwidth() <= 1) {
        xScale = d3.scaleBand()
            .domain(d3.range(xAxisData.length))
            .range([0, xAxisData.length * 3]);

        // Set up SVG element for graph
        graphSVGElement
            .attr("height", height)
            .attr("width", xScale.range()[1] + 25)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");
    }

    // Create selection for bar graph bars
    const bar = graphSVGElement.selectAll("g")
        .data(yAxisData) //Attach bars to Y-Axis data
        .join("g")
            .attr("transform", (d, i) => `translate(${xScale(i)}, ${height - yScale(d)})`);

    bar.append("rect")
        .attr("fill", barColor)
        .attr("width", xScale.bandwidth() - 1) // Sets a padding of one pixel between bars
        .attr("height", yScale);
    
    // // Create startup transition
    // bar.selectAll("rect")
    //     .transition()
    //     .duration(800) // 800 milliseconds to transition from height 0 to the correct height
    //     .attr("height", yScale);

    // Create a Y-Axis Scale
    const yAxis = d3.axisLeft()
        .scale(yAxisScale);

    // Prepare the Y-Axis Element
    axisSVGElement
        .attr("height", height)
        .attr("class", "axis")
        .attr("width", axisWidth)

    // Attach the axis to the SVG Element
    axisSVGElement
        .append("g")
            .attr("transform", `translate(${axisWidth}, ${height})`)
            .style("color", "black")
            .call(yAxis);
}

const seperateAxisDynamicBarChartGenerator = function(height, barWidth, graphSVGElement, axisSVGElement, queryResult, xAxisKey, yAxisKey, axisWidth= 100, barColor = "black") {
    
    // Clear SVG Elements of old data
    graphSVGElement.selectAll("*").remove();
    axisSVGElement.selectAll("*").remove();

    // Create an Array for each Axis
    xAxisData = queryResult.map(d => d[xAxisKey]);
    yAxisData = queryResult.map(d => parseInt(d[yAxisKey]));

    // Create a D3 Linear Scale for the Y-Axis
    yScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData) + 5])
        .range([0, height]);    

    // Create a D3 Linear Scale for the Y-Axis Label
    // We negate the height here so that the bars are drawn correctly
    yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData) + 5])
        .range([0, -height]);

    // Create a D3 Band Scale for the X-Axis
    // A non-static SVG will change size depending on the number of elements in the X-Axis
    // Here, the width parameter is treated as the width of each bar in the graph
    xScale = d3.scaleBand()
        .domain(d3.range(xAxisData.length))
        .range([0, barWidth * xAxisData.length]);

    // Setup SVG element attributes 
    graphSVGElement
        .attr("height", height)
        .attr("width", xScale.range()[1])
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");
    
    // Create selection for bar graph bars
    const bar = graphSVGElement.selectAll("g")
        .data(yAxisData) //Attach bars to Y-Axis data
        .join("g")
            .attr("transform", (d, i) => `translate(${xScale(i)}, ${height - yScale(d)})`);

    // Add a rectangle to the bar element
    bar.append("rect")
        .attr("fill", barColor)
        .attr("width", xScale.bandwidth() - 1) // Sets a padding of one pixel between bars
        .attr("height", yScale);
    
    // // Create startup transition
    // bar.selectAll("rect")
    //     .transition()
    //     .duration(800) // 800 milliseconds to transition from height 0 to the correct height
    //     .attr("height", yScale);

    // Create a Y-Axis Scale
    const yAxis = d3.axisLeft()
        .scale(yAxisScale);

    // Prepare the Y-Axis Element
    axisSVGElement
        .attr("height", height)
        .attr("width", axisWidth)
        .attr("class", "axis");

    // Attach the axis to the SVG Element
    axisSVGElement
        .append("g")
            .attr("transform", `translate(${axisWidth}, ${height})`)
            .style("color", "black")
            .call(yAxis);
}

const barGraphFloatingTooltipGenerator = function(graphSVGElement, xLabelFunction, yLabelFunction) {
    
    //Select all bar graph bar elements
    const bar = graphSVGElement.selectAll("g")
    
    // Set up tooltip for graph data viewing
    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    // Add event listener for tooltip
    bar.on("mousemove", function(d, i){
        tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html(yLabelFunction(d, i) + "<br>" + xLabelFunction(d, i));
    })
        .on("mouseout", function(d){ tooltip.style("display", "none");
    });
}

const temporalLineGraphGenerator = function(height, width, graphSVGElement, labelElement, queryResult, xAxisKey, yAxisKey, yScale = null, color = "purple") {

    // Parse out data from query input
    xAxisData = queryResult.map(d => d[xAxisKey]);
    yAxisData = queryResult.map(d => d[yAxisKey]);

    // If yScale is provided by the user, to stack line graphs on each other
    if(yScale == null) {
        // Create D3 Scale for Y Axis
        yScale = d3.scaleLinear()
            .domain([d3.min(yAxisData), d3.max(yAxisData) + 5])
            .range([0, height]);

        // Create D3 Scale for Y Axis Label
        yAxisScale = d3.scaleLinear()
            .domain([d3.min(yAxisData), d3.max(yAxisData) + 5])
            .range([0, -height]);

        // Set Up Y-Axis Label
        const yAxis = d3.axisLeft()
            .scale(yAxisScale);

        // Attach Y-Axis Label to Chart
        svg.append("g").attr("transform", "translate(25, 500)").style("color", "black").call(yAxis);
    }

    // Create D3 Scale for Y Axis Label
    yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(yAxisData) + 5])
        .range([0, -height]);

    // A Temporal Line Graph uses a Time-Based X-Axis
    xScale = d3.scaleTime()
        .domain(d3.extent(xAxisData))
        .range([ 0, width ]);

    // Set up SVG element for graph
    graphSVGElement
        .attr("height", height)
        .attr("width", xScale.range()[1] + 25)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");

    // // Clear SVG Canvas
    // graphSVGElement.selectAll("*").remove();

    // Add X-Axis Label
    graphSVGElement.append("g")
        .attr("transform", "translate(25," + (height - 25) + ")")
        .style("color", "black")
        .call(d3.axisBottom(xScale));

    // Add line for line graph
    svg.append("path")
        .datum(queryResult)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d[xAxisKey]) })
            .y(function(d) { return yScale(d[yAxisKey]) }))
        .attr("transform", "translate(25, 500),scale(1, -1)")

    dot = svg.append("circle")

    svg.on("mousemove", function() {
        date = xScale.invert(d3.event.clientX - d3.event.target.getBoundingClientRect().left) 
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60.0));
        date.setMinutes(0, 0, 0);
        
        d = xAxisData.indexOf(date.getTime());

        dot
            .attr("cx", xScale(date.getTime()) - 3)
            .attr("cy", 500 - yScale(values[d - 4]))
            .attr("r", 5)
            .attr("fill", color)

        labelElement.html("Date: " + date.toString() + " <br>Value: " + (values[d - 4]))
    });

    return yScale;
} 

const nonTemporalLineGraphGenerator = function(height, width, graphSVGElement, labelElement, queryResult, xAxisKey, yAxisKey, yScale = null, color = "purple") {

    // Parse out data from query input
    xAxisData = queryResult.map(d => parseInt(d[xAxisKey]));
    yAxisData = queryResult.map(d => parseInt(d[yAxisKey]));    

    // If yScale is provided by the user, to stack line graphs on each other
    if(yScale == null) {
        // Create D3 Scale for Y Axis
        yScale = d3.scaleLinear()
            .domain([d3.min(yAxisData), d3.max(yAxisData) + 5])
            .range([0, height]);

        // Create D3 Scale for Y Axis Label
        yAxisScale = d3.scaleLinear()
            .domain([d3.min(yAxisData), d3.max(yAxisData) + 5])
            .range([0, -height]);

        // Set Up Y-Axis Label
        const yAxis = d3.axisLeft()
            .scale(yAxisScale);

        // Attach Y-Axis Label to Chart
        svg.append("g").attr("transform", "translate(25, 500)").style("color", "black").call(yAxis);
    }

    // A Non-Temporal Line Graph uses a regular, linearly scaled X-Axis
    xScale = d3.scaleLinear()
        .domain([d3.min(xAxisData), d3.max(xAxisData)])
        .range([0, width]);

    // Set up SVG element for graph
    graphSVGElement
        .attr("height", height)
        .attr("width", xScale.range()[1] + 25)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");

    // // Clear SVG Canvas
    // graphSVGElement.selectAll("*").remove();

    // Add X-Axis Label
    graphSVGElement.append("g")
        .attr("transform", "translate(25," + (height - 25) + ")")
        .style("color", "black")
        .call(d3.axisBottom(xScale));

    // Add line for line graph
    svg.append("path")
        .datum(queryResult)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d[xAxisKey]) })
            .y(function(d) { return yScale(d[yAxisKey]) }))
        .attr("transform", "translate(25, 500),scale(1, -1)");

    dot = svg.append("circle");

    svg.on("mousemove", function() {
        xValue = xScale.invert(d3.event.clientX - d3.event.target.getBoundingClientRect().left);

        d = xAxisData.indexOf(Math.round(xValue));

        dot
            .attr("cx", xScale(xValue) - 3)
            .attr("cy", 500 - yScale(yAxisData[d - 4]))
            .attr("r", 5)
            .attr("fill", color);

        labelElement.html(xValue + " " + (yAxisData[d - 4]));
    });

    return yScale;
} 