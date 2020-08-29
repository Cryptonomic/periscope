import * as d3 from "d3";

export class chartGenerator {

    static graphGenerator(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", spacing: number) {
        
         // Clear SVG Elements of old data
         svg.selectAll("*").remove();

        const margin = {top: 0, right: 0, bottom: 50, left: 70};

        let xRange: any = d3.range(data.length);
        const constData: any = d3.range(15);
        const xAxisData =  data.map((d: any, index: any) => index);
        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));

        let x = d3.scaleBand()
                    .domain(xRange)
                    .range([margin.left, width - margin.right])
                    .padding(0.1);


        const y = d3.scaleLinear()
                    .domain([0, d3.max<any>(yAxisData)])
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
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .call(d3.axisBottom(xAxisScaleForBottom).ticks(15))
            .attr("class", "xAxis");

        const yAxis = (g:any) => g
            .attr("transform", `translate(${margin.left},${margin.right})`)
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

    static seperateAxisPrioritizedBarChartGenerator(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", spacing: number, marginLeft: number, marginRight: number = 100) {
        
       // Clear SVG Elements of old data
       svg.selectAll("*").remove();

       const margin = {top: 0, right: 20, bottom: 50, left: marginLeft};

       let xRange: any = d3.range(data.length);
       const constData: any = d3.range(15);
       const xAxisData =  data.map((d: any, index: any) => index);
       const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));

       let x = d3.scaleBand()
                   .domain(xRange)
                   .range([margin.left, width - margin.right])
                   .padding(0.1);


       const y = d3.scaleLinear()
                   .domain([0, d3.max<any>(yAxisData)])
                   .range([height - margin.bottom, margin.top])

       
       let xAxisScaleForBottom: any = d3.scaleLinear<string>().domain([0, data.length]).range(<any>([margin.left, width - margin.right]));
       if(data.length < 100) {
           xAxisScaleForBottom = x; 
       }

       function make_y_gridlines() {		
            return d3.axisLeft(y)
                .ticks(5)
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
           .style('font-family', 'Nunito')
           .style('font-size', '10px')
           .style('font-weight', '400')
           .call(d3.axisLeft(y).ticks(5));
        // add the Y gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left},50)`)
        .style('font-family', 'Nunito')
        .style('font-size', '10px')
        .style('font-weight', '400')
        .call(make_y_gridlines()
            .tickSize(-width+marginLeft)
            .tickFormat(null)
        ).attr("opacity", '.6')  

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
            .attr("class", "y-axis")
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
        .on("mouseout", function(this:any, d: any){ 
            d3.select(this).attr("fill", color)
            tooltip.style("display", "none");
        });
    }

    static generateLineChart(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", yLabelFunction: Function, xLabelFunction: Function) {
        // Clear SVG Elements of old data
        svg.selectAll("*").remove();

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
        data.forEach((item:any, index:number) => { 
            item.x = index+1;
        })

        // append the svg object to the body of the page
        var svg = svg
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        

        // Add X axis --> it is a date format
        const x:any = d3.scaleLinear()
                .domain([0, (data.length-1)])
                .range([0, width]);

        svg.append("g")
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));
        var y = d3.scaleLinear()
            .domain([0, d3.max<any>(yAxisData)])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        const bisect = d3.bisector(function(d:any) { return d.x; }).left;

        // Add the line
        svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d:any, i: number) { return x(i) })
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
            var x0 = x.invert(d3.mouse(this)[0]);
            var i = bisect(data, x0, 1);
            var selectedData = data[i]

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
                .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
        }
        function mouseout() {
            tooltip.style("display", "none");
        }

    }


    static generateLineChartWithoutXAxis(height: number, width: number, svg: any, data: any, xAxisKey: string, yAxisKey: string, color:string = "rgba(135, 194, 205, 0.58639)", yLabelFunction: Function, xLabelFunction: Function) {
        // Clear SVG Elements of old data
        svg.selectAll("*").remove();

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
        data.forEach((item:any, index:number) => { 
            item.x = index+1;
        })

        // append the svg object to the body of the page
        var svg = svg
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        

        // Add X axis --> it is a date format
        const x:any = d3.scaleLinear()
                .domain([0, (data.length-1)])
                .range([0, width]);

        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));

        // Add Y axis
        const yAxisData = data.map((d: { [x: string]: string; }) => parseFloat(d[yAxisKey]));
       
        var y = d3.scaleLinear()
            .domain([0, d3.max<any>(yAxisData)])
            .range([ height, 0 ]);
        svg.append("g")
            .style('font-family', 'Nunito')
            .style('font-size', '10px')
            .style('font-weight', '400')
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).ticks(5));

        const bisect = d3.bisector(function(d:any) { return d.x; }).left;

        // Add the line
        svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d:any, i: number) { return x(i) })
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
            var x0 = x.invert(d3.mouse(this)[0]);
            var i = bisect(data, x0, 1);
            var selectedData = data[i]

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
                .html(yLabelFunction(selectedData, i) + "<br>" + xLabelFunction(selectedData, i));
        }
        function mouseout() {
            tooltip.style("display", "none");
        }

    }
}