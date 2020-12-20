const drawLineChart = (groupData, svg, width, height, id) => {
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

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxEarnings]);

    // line form
    var line = d3.line()
        .x(function(d) { return x(parseTime(d.year)); })
        .y(function(d) { return y(d.totalEarnings); })
        .curve(d3.curveMonotoneX);

    Object.entries(groupData).forEach(([genre, data]) => {
        // append the lines
        svg.append("path")
            .data([data])
            .attr("class", function (d) { return "line " + genre.replaceAll(" ", ""); })
            .attr("d", line)
            .style("fill", "none")
            .style("stroke-width", "3")
            .style("stroke", function (d) { return color(genre.replaceAll(" ", "")); })
            .on("mouseover", function (d) { mouseOver({"genre": genre}, id)} )
            .on("mouseout", function (d) { mouseOut(genre)} );

        // append the dots
        svg.selectAll(".dot")
            .data([data])
            .enter()
            .append("circle")
                .attr("class", function (d) { return "dot " + genre.replaceAll(" ", ""); })
                .attr("cx", function(d) { return x(parseTime(d.year)) })
                .attr("cy", function(d) { return y(d.totalEarnings) })
                .attr("r", 2)
                .style("fill", function (d) { return color(genre.replaceAll(" ", "")); })
                .on("mouseover", function (d) { return mouseOver(d, id)} )
                .on("mouseout", function (d) { return mouseOut(genre)} );
    });

    // add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

    // add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));
}