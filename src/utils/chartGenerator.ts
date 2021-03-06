import * as d3 from "d3";
import moment from "moment";

export class chartGenerator {

    static graphGenerator(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", spacing: number, marginLeft: number,ele: any, tickSpacing: number=6, isDateAxis: boolean) {
        
        // Clear SVG Elements of old data
        svg.selectAll("*").remove();

        const margin = {top: 10, right: 20, bottom: 20, left: marginLeft};
        width = ele.current.offsetWidth ? ele.current.offsetWidth : width;
        svg.attr('height', height)
            .attr('width', width);

        let xRange: any = d3.range(data.length);
        const xAxisData =  data.map((d: any) => d[xAxisKey]);
        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));

        let x = d3.scaleBand()
                    .domain(xRange)
                    .range([margin.left, width - margin.right])
                    .padding(0.1);


        const y = d3.scaleLinear()
                    .domain([0, d3.max<any>(yAxisData)])
                    .range([height - margin.bottom, margin.top])

        
        let xAxisScaleForBottom: any = d3.scaleLinear<string>().domain([0, (data.length-1)]).range(([margin.left, width - margin.right]) as any);
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
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .call(d3.axisBottom(xAxisScaleForBottom)
            .tickFormat((d:any, i:any) => {
                if(isDateAxis) {
                    return moment(data[d][xAxisKey]).format("HH")
                }
                return d+1;
                
            })
            .ticks(15))
            .attr("class", "xAxis");

        const yAxis = (g:any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .call(d3.axisLeft(y).ticks(5))
            .call((g:any) => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle"))
                .attr("class", "yAxis");
    

        spacing = yAxisData.length <= 70 ? spacing : 1;
        svg.append("g")
            .attr("class", "svg-columns")
            .attr('transform', `translate(${tickSpacing},0)`)
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

    static graphGeneratorWeeklyDateAxis(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", spacing: number, marginLeft: number,ele: any, tickSpacing: number=6) {
        
        // Clear SVG Elements of old data
        svg.selectAll("*").remove();

        const margin = {top: 10, right: 30, bottom: 20, left: marginLeft};
        width = ele.current.offsetWidth ? ele.current.offsetWidth : width;
        svg.attr('height', height)
            .attr('width', width);

        let xRange: any = d3.range(data.length);
        var xExtent: any = d3.extent(data, (d: any) => d[xAxisKey]);
        const minDate: any = new Date(d3.min(data, (d: any) => d[xAxisKey]) as any);
        const maxDate: any= new Date(d3.max(data, (d: any) => d[xAxisKey]) as any);

        var xScale: any = d3.scaleTime()
                            .domain([minDate, maxDate])
                            .range([margin.left, width - margin.right]);

        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));


        const y = d3.scaleLinear()
                    .domain([0, d3.max<any>(yAxisData)])
                    .range([height - margin.bottom, margin.top])

        
        // if(width/data.length <= 3) {

        //     xScale = d3.scaleTime()
        //         .domain([minDate, maxDate])
        //         .range([margin.left, (width - margin.right)*3]);
        // }
       
        const xAxis = (g:any) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .call(d3.axisBottom(xScale)
            .ticks(d3.timeDay)
            .tickFormat(d3.timeFormat('%d %b') as any))
            .attr("class", "xAxis");

        const yAxis = (g:any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .call(d3.axisLeft(y).ticks(5))
            .call((g:any) => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle"))
                .attr("class", "yAxis");
    

        spacing = yAxisData.length <= 70 ? spacing : 2;
        svg.append("g")
            .attr("class", "svg-columns")
            .attr('transform', `translate(0,0)`)
            .attr("fill", color)
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d:any, i:any) => xScale(d[xAxisKey]))
            .attr("y", (d:any) => y(d[yAxisKey]))
            .attr("height", (d:any) => y(0) - y(d[yAxisKey]))
            .attr("width", width/data.length- spacing );
        
        svg.append("g")
                .call(xAxis);
        
        svg.append("g")
                .call(yAxis);

    }

    static barGraphFloatingTooltipGenerator(graphSVGElement: any, xLabelFunction: Function, yLabelFunction: Function, color: string, hoverColor: string) {
        
        //Select all bar graph bar elements
        const bar = graphSVGElement.selectAll("g.svg-columns rect")
        
        // Set up tooltip for graph data viewing
        const tooltip = d3.select("body").append("div").attr("class", "graphToolTip");
    
        // Add event listener for tooltip
        bar.on("mousemove", function(this:any, d: any, i: number,) {
            d3.select(this).attr("fill", hoverColor);
            if(window.innerWidth/2 > d3.event.pageX) {
                tooltip
                    .attr("class", "graphToolTip")
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
                    .style("transform", "translate(0, 0)")
                    .style("max-width", "160px")
                    .style("min-width", "140px")
                    .style("word-break", "break-word")
                    .html(yLabelFunction(d, i) + "<br>" + xLabelFunction(d, i));
            } else {
                tooltip
                    .attr("class", "rightArrow")
                    .style("left", d3.event.pageX + "px")
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
                    .style("transform", "translate(-110%, 0)")
                    .style("max-width", "160px")
                    .style("min-width", "140px")
                    .style("word-break", "break-word")
                    .html(yLabelFunction(d, i) + "<br>" + xLabelFunction(d, i));
            }
            
        })
        .on("mouseout", function(this:any, d: any){ 
            d3.select(this).attr("fill", color)
            tooltip.style("display", "none");
        });
    }

    static generateLineChart(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", yLabelFunction: Function, xLabelFunction: Function, ele: any) {
        // Clear SVG Elements of old data
        svg.selectAll("*").remove();

        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 20, bottom: 30, left: 70};
        width = ele.current.offsetWidth ? ele.current.offsetWidth : width;


        svg.attr('height', height)
            .attr('width', width);
            
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
    
        // append the svg object to the body of the page
        svg = svg
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        

        // Add X axis --> it is a date format
        const xData:any = d3.scaleLinear()
                .domain([0, (data.length-1)])
                .range([0, width]);

        let xRange: any = d3.range(data.length);
        let x = d3.scaleBand()
                .domain(xRange)
                .range([0, width])
                .padding(0.1);

        let devisor = 1;
        if (data.length > 100 && data.length < 500) {
            devisor = 10;
        } else if (data.length > 500) {
            devisor = 100;
        }
        svg.append("g")
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
            .tickValues(x.domain().filter(function(d,i:number) { 
                return !(i%devisor)
            })).ticks(15));

        // Add Y axis
        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));
        const y = d3.scaleLinear()
            .domain([0, d3.max<any>(yAxisData)])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        const bisect = d3.bisector(function(d:any) { return d.x; }).left;

        // Add the line
        svg
            .append("path")
            .datum(data)
            .attr("width", width - margin.right)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d:any, i: number) { return xData(i) })
            .y(function(d: any, i: number) { return y(d[yAxisKey]) })
            )

        // Create a rect on top of the svg area: this rectangle recovers mouse position
        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);


        // What happens when the mouse move -> show the annotations at the right positions.
        let tooltip: any = '';
        function mouseover() {
            tooltip = d3.select("body").append("div").attr("class", "graphToolTip");
        }

        function mousemove(this: any) {
            // recover coordinate we need
            const x0 = xData.invert(d3.mouse(this)[0]);
            const i = bisect(data, x0, 1);
            // var d0 = data[i - 1],
            // d1 = data[i],                                  
            const selectedData = data[Math.floor(Math.abs(x0))];
            //var selectedData = data[i]
            if(window.innerWidth/2 > d3.event.pageX) {
                tooltip
                    .attr("class", "graphToolTip")
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
                    .style("transform", "translate(0, 0)")
                    .style("max-width", "160px")
                    .style("min-width", "140px")
                    .style("word-break", "break-word")
                    .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
            } else {
                tooltip
                    .attr("class", "rightArrow")
                    .style("left", d3.event.pageX + "px")
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
                    .style("transform", "translate(-110%, 0)")
                    .style("max-width", "160px")
                    .style("min-width", "140px")
                    .style("word-break", "break-word")
                    .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
            }
        }
        function mouseout() {
            tooltip.style("display", "none");
        }

    }

    static generateLineChartWithDateAxis(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", yLabelFunction: Function, xLabelFunction: Function, ele: any) {
         // Clear SVG Elements of old data
         svg.selectAll("*").remove();

         // set the dimensions and margins of the graph
         const margin = {top: 10, right: 20, bottom: 30, left: 70};
         width = ele.current.offsetWidth ? ele.current.offsetWidth : width;
 
 
         svg.attr('height', height)
             .attr('width', width);
             
         width = width - margin.left - margin.right;
         height = height - margin.top - margin.bottom;
     
         // append the svg object to the body of the page
         svg = svg
             .append("g")
             .attr("transform","translate(" + margin.left + "," + margin.top + ")");
         
 
         // Add X axis --> it is a date format
         const minDate: any = new Date(d3.min(data, (d: any) => d[xAxisKey]) as any);
         const maxDate: any= new Date(d3.max(data, (d: any) => d[xAxisKey]) as any);
 
         const bisectDate = d3.bisector((d: any) => { return d[xAxisKey]; }).left,
         dateFormatter = d3.timeFormat("%d %b");
 
         const xData: any = d3.scaleTime()
                             .domain([minDate, maxDate])
                             .range([0, width]);
         
         svg.append("g")
             .style('font-family', 'Nunito')
             .style('font-size', '10px')
             .style('font-weight', '400')
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(xData).ticks(d3.timeWeek).tickFormat(dateFormatter as any));
 
         // Add Y axis
         const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));
         const y = d3.scaleLinear()
             .domain([0, d3.max<any>(yAxisData)])
             .range([ height, 0 ]);
         svg.append("g")
             .call(d3.axisLeft(y).ticks(5));
 
         // Add the line
         svg
             .append("path")
             .datum(data)
             .attr("width", width - margin.right)
             .attr("fill", "none")
             .attr("stroke", color)
             .attr("stroke-width", 1.5)
             .attr("d", d3.line()
             .x(function(d:any, i: number) { return xData(d[xAxisKey]) })
             .y(function(d: any, i: number) { return y(d[yAxisKey]) })
             )
 
         // Create a rect on top of the svg area: this rectangle recovers mouse position
         svg
             .append('rect')
             .style("fill", "none")
             .style("pointer-events", "all")
             .attr('width', width)
             .attr('height', height)
             .on('mouseover', mouseover)
             .on('mousemove', mousemove)
             .on('mouseout', mouseout);
 
 
         // What happens when the mouse move -> show the annotations at the right positions.
         let tooltip: any = '';
         function mouseover() {
             tooltip = d3.select("body").append("div").attr("class", "graphToolTip");
         }
 
         function mousemove(this: any) {
             // recover coordinate we need
             var x0 = xData.invert(d3.mouse(this)[0]),
                 i = bisectDate(data, x0, 1),
                 d0 = data[i - 1],
                 d1 = data[i],
                 selectedData = x0 - d0.date > d1.date - x0 ? d1 : d0;
                 //selectedData = data[Math.floor(Math.abs(i))];
             //var selectedData = data[i]
             if(window.innerWidth/2 > d3.event.pageX) {
                 tooltip
                     .attr("class", "graphToolTip")
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
                     .style("transform", "translate(0, 0)")
                     .style("max-width", "160px")
                     .style("min-width", "140px")
                     .style("word-break", "break-word")
                     .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
             } else {
                 tooltip
                     .attr("class", "rightArrow")
                     .style("left", d3.event.pageX + "px")
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
                     .style("transform", "translate(-110%, 0)")
                     .style("max-width", "160px")
                     .style("min-width", "140px")
                     .style("word-break", "break-word")
                     .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
             }
         }
         function mouseout() {
             tooltip.style("display", "none");
         }

    }
}