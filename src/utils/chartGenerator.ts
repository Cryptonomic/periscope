import * as d3 from "d3";

export class chartGenerator {

    
    static seperateAxisPrioritizedBarChartGenerator(height: number, width: number, graphSVGElement: any, queryResult: Array<object>, xAxisKey: string, yAxisKey: string, barColor:string = "rgba(135, 194, 205, 0.58639)", labelX: string, labelY: string, spacing: number, stroke: string = "#56C2D9") {
        
        // Clear SVG Elements of old data
        graphSVGElement.selectAll("*").remove();

        const margin = {top: 20, right: 0, bottom: 50, left: 0};
    
        // Create an Array for each Axis
        let xAxisData: any = queryResult.map(d => (<any>d)[xAxisKey]);
        const yAxisData: any = queryResult.map(d => (<any>d)[yAxisKey]);
    
        // Create a D3 Linear Scale for the Y-Axis
        const yScale = d3.scaleLinear()
            .domain([0, d3.max<any>(yAxisData)])
            .range([0, height]);
    
        // Create a D3 Linear Scale for the Y-Axis Label
        // We negate the height here so that the bars are drawn correctly
        const yAxisScale: any = d3.scaleLinear<string>()
            .domain([0, d3.max<any>(yAxisData)])
            .range(<any>([0, -height]));
    
        // Create a D3 Band Scale for the X-Axis
        // A static SVG will have a fixed size no matter the number of elements
        // Here, the width parameter is treated as the width of each bar in the graph
        let range: any = d3.range(xAxisData.length);
        let xScale = d3.scaleBand()
            .domain(range)
            .range([0, width]);
    
        // Setup SVG element attributes 
        graphSVGElement
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
            .attr("font-family", "roboto")
            .attr("color", "#6A707E")
            .attr("font-size", "12")
            .attr("font-weight", "500")
            .attr("text-anchor", "end");
            
        if(xScale.bandwidth() <= 1) {
            let rangeData: any = d3.range(xAxisData.length)
            xScale = d3.scaleBand()
                .domain(rangeData)
                .range([0, xAxisData.length * 3]);
    
            // Set up SVG element for graph
            graphSVGElement
                .attr("height", height + margin.top + margin.bottom)
                .attr("width", xScale.range()[1] + 25)
                .attr("font-family", "roboto")
                .attr("font-size", "12")
                .attr("font-weight", "500")
                .attr("text-anchor", "end");
        }
        // X axis Label
        graphSVGElement.append("text")
            .attr("class", "x label")
            .attr("color", "#6A707E")
            .attr("text-anchor", "end")
            .attr("font-family", "Roboto")
            .attr("font-weight", "500")
            .attr("font-size", "12px")
            .attr("x", width/2)
            .attr("y", height +30)
            .text(labelX);
        // Y axis Label
        graphSVGElement.append("text")
            .attr("class", "y label")
            .attr("color", "#6A707E")
            .attr("text-anchor", "end")
            .attr("font-family", "Roboto")
            .attr("font-weight", "500")
            .attr("font-size", "12px")
            .attr("x", -height/2)
            .attr("y", 10)
            .attr("transform", "rotate(-90)")
            .text(labelY);

        // Create selection for bar graph bars
        const bar = graphSVGElement.selectAll("g")
            .data(yAxisData) //Attach bars to Y-Axis data
            .join("g")
                .attr("transform", (d: any, i: any) => `translate(${xScale(i)}, ${height - yScale(d)})`);
        
        spacing = yAxisData.length <= 70 ? spacing : 1;
        bar.append("rect")
            .style("stroke-width", "1")
            .style("stroke", stroke) 
            .attr("fill", barColor)
            .attr("width", xScale.bandwidth() - spacing) // Sets a padding of five pixel between bars
            .attr("height", yScale);
    }

    static yAxisGenerator(axisSVGElement: any, height: number, queryResult: Array<object>, yAxisKey: string, labelY: string, axisWidth: number=100) {
        
        axisSVGElement.selectAll("*").remove();

        let yAxisData: any = queryResult.map(d => parseInt((<any>d)[yAxisKey]));

        const max = d3.max<any>(yAxisData)+5;
        console.log(max);
        const yAxisScale: any = d3.scaleLinear<string>()
            .domain([0, max])
            .range(<any>([-5, -height]));

        // Create a Y-Axis Scale
        const yAxis = d3.axisLeft(yAxisScale)
        .scale(yAxisScale).ticks(5);

        // Prepare the Y-Axis Element
        axisSVGElement
            .attr("height", height)
            .attr("width", axisWidth)
            .attr("class", "y-axis");

        // axisSVGElement.append("text")
        //     .attr("class", "y label")
        //     .attr("color", "#6A707E")
        //     .attr("text-anchor", "end")
        //     .attr("font-family", "Roboto")
        //     .attr("font-weight", "500")
        //     .attr("font-size", "12px")
        //     .attr("x", -height/2)
        //     .attr("y", 10)
        //     .attr("transform", "rotate(-90)")
        //     .text(labelY);
        

        // Attach the axis to the SVG Element
        axisSVGElement
            .append("g")
            .attr("transform", `translate(${axisWidth}, ${height})`)
            .style("color", "#6A707E")
            .style("font-size", "14px")
            .style("font-weight", "500")
            .style("font-family", "roboto")
            .call(yAxis);
    }

    static xAxisGenerator(axisSVGElement: any, width: number, height: number, queryResult: Array<object>, xAxisKey: string, labelY: string, axisWidth: number=100) {
        
        axisSVGElement.selectAll("*").remove();

        const xAxisScale: any = d3.scaleLinear<string>()
            .domain([0, width])
            .range(<any>([1, width]));
        // Prepare the Y-Axis Element
        axisSVGElement
            .attr("height", 30)
            .attr("width", width)
            .attr("class", "x-axis");

        // Create a Y-Axis Scale
        const x_axis = d3.axisBottom(xAxisScale)
        .scale(xAxisScale).ticks(15);

        axisSVGElement.append("g")
            .style("color", "#6A707E")
            .style("font-size", "14px")
            .style("font-weight", "500")
            .style("font-family", "roboto")
            .call(x_axis)
    }

    static barGraphFloatingTooltipGenerator(graphSVGElement: any, xLabelFunction: Function, yLabelFunction: Function) {
        
        //Select all bar graph bar elements
        const bar = graphSVGElement.selectAll("g")
        
        // Set up tooltip for graph data viewing
        const tooltip = d3.select("body").append("div").attr("class", "graphToolTip");
    
        // Add event listener for tooltip
        bar.on("mousemove", function(d: any, i: number) {
            tooltip
                .style("left", d3.event.pageX + 20 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .style("position", "absolute")
                .style("text-align", "center")
                .style("background", "#313C4E")
                .style("box-shadow", "1.5px 2.5px 4px rgba(119, 119, 119, 0.25)")
                .style("font-family", "Roboto")
                .style("font-size", "8px")
                .style("line-height", "15px")
                .style("letter-spacing", "0.4px")
                .style("color", "#ffffff")
                .style("padding", "10px 15px")
                .html(yLabelFunction(d, i) + "<br>" + xLabelFunction(d, i));
        })
            .on("mouseout", function(d: any){ tooltip.style("display", "none");
        });
    }
    
}
