const drawLineChart = (groupData, svg, width, height, margin, title, id) => {
    //data
    var maxEarnings = groupData[2]
    var years = d3.extent(groupData[1], function(d) { return d; });
    groupData = groupData[0];

    // clean draw
    svg.selectAll("*").remove();

    // set the ranges
    var x = d3.scaleTime()
        .range([0, width])
        .domain([parseTime(years[0]), parseTime(years[1])]);

    var y = d3.scaleSymlog()
        .range([height, 0])
        .domain([0, maxEarnings]);

    // line form
    var line = d3.line()
        .x(function(d) { return x(parseTime(d.year)); })
        .y(function(d) { return y(d.totalEarnings); })
        .curve(d3.curveMonotoneX);

    // append the lines
    svg.selectAll(".category")
        .data(groupData)
        .enter()
        .append("g")
        .attr("class", "category")
        .append("path")
            .attr("class", function (d) { return "line " + d.name.replaceAll(" ", ""); })
            .attr("d", function(d) { return line(d.datapoints); })
            .style("fill", "none")
            .style("stroke-width", "3")
            .style("stroke", function(d) { return color(d.name.replaceAll(" ", "")); })
            .on("mouseover", function (d) { return mouseOver({"genre": d.name}, id)} )
            .on("mouseout", function (d) { return mouseOut(d.name)} );

    var dots = $.map(groupData, function(value, key) { return value.datapoints });

    // append the dots
    svg.selectAll(".dot")
        .data(dots)
        .enter()
        .append("circle")
            .attr("class", function (d) { return "dot " + d.name.replaceAll(" ", ""); })
            .attr("cx", function(d) { return x(parseTime(d.year)) })
            .attr("cy", function(d) { return y(d.totalEarnings) })
            .attr("r", 4)
            .style("fill", function (d) { return color(d.name.replaceAll(" ", "")); })
            .on("mouseover", function (d) { return mouseOver({"genre": d.name}, id)} )
            .on("mouseout", function (d) { return mouseOut(d.name)} );

    // add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .style("color", "white")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

    // add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .style("color", "white")
        //.call(d3.axisLeft(y))
        .call(d3.axisLeft(y).ticks(10000, "s").tickValues([10000, 100000, 100000, 1000000, 10000000, 100000000]));

    // add the title
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y", -10)
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "20px")
        .text(title);

    // add x axis label
    svg.append("text")
        .style("fill", "white")
        .style("font-size", "15px")
        .attr("text-anchor", "end")
        .attr("x", width - 10)
        .attr("y", height + margin.top + 20)
        .text("Years");

    // add y axis label
    svg.append("text")
        .style("fill", "white")
        .style("font-size", "15px")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Earnigs");
}