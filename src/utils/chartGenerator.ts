import * as d3 from "d3";

export class chartGenerator {

    static graphGenerator(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", spacing: number) {
        
         // Clear SVG Elements of old data
         svg.selectAll("*").remove();

        const margin = {top: 0, right: 0, bottom: 50, left: 100};

        let xRange: any = d3.range(data.length);
        const constData: any = d3.range(15);
        const xAxisData =  data.map((d: any, index: any) => index);
        const yAxisData = data.map((d: { [x: string]: string; }) => parseInt(d[yAxisKey]));

        let x = d3.scaleBand()
                    .domain(xRange)
                    .range([margin.left, width - margin.right])
                    .padding(0.1);


        const y = d3.scaleLinear()
                    .domain([1, d3.max<any>(yAxisData)])
                    .range([height - margin.bottom, margin.top])

        
        let xAxisScaleForBottom: any = d3.scaleLinear<string>().domain([0, data.length]).range(<any>([margin.left, width - margin.right]));
        if(data.length < 100) {
            xAxisScaleForBottom = x; 
        }

        if(x.bandwidth() <= 3) {
            let rangeData: any = d3.range(xAxisData.length)
            x = d3.scaleBand()
                .domain(rangeData)
                .range([margin.left, xAxisData.length * 3]);
        }
       
        const xAxis = (g:any) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xAxisScaleForBottom).ticks(15))

        const yAxis = (g:any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5))
            .call((g:any) => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle"));

        spacing = yAxisData.length <= 70 ? spacing : 1;
        svg.append("g")
            .attr("class", "svg-columns")
            .attr("fill", color)
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d:any, i:any) => x(i))
            .attr("y", (d:any) => y(d[yAxisKey]))
            .attr("height", (d:any) => y(0) - y(d[yAxisKey]))
            .attr("width", x.bandwidth() - spacing);
        
        svg.append("g")
                .call(xAxis);
        
        svg.append("g")
                .call(yAxis);
    }

    static barGraphFloatingTooltipGenerator(graphSVGElement: any, xLabelFunction: Function, yLabelFunction: Function) {
        
        //Select all bar graph bar elements
        const bar = graphSVGElement.selectAll("g.svg-columns rect")
        
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
                .style("padding", "5px 20px")
                .html(yLabelFunction(d, i) + "<br>" + xLabelFunction(d, i));
        })
            .on("mouseout", function(d: any){ tooltip.style("display", "none");
        });
    }

}