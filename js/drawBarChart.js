const drawBarChart = (groupData, svg, width, height, title, id) => {
    // clean draw
    svg.selectAll("*").remove();

    // set the ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(groupData, function (d) {
            return d.totalEarnings;
        })]);

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1)
        .domain(groupData.map(function (d) {
            return d.name;
        }));

    // append the bars
    svg.selectAll(".bar")
        .data(groupData)
        .enter()
        .append("rect")
            .attr("class", function (d) { return "bar " + d.genre.replaceAll(" ", ""); })
            .style("fill", function (d) { return color(d.genre.replaceAll(" ", "")); })
            .attr("width", function (d) { return x(d.totalEarnings); })
            .attr("y", function (d) { return y(d.name); })
            .attr("height", y.bandwidth())
            .on("mouseover", function (d) { return mouseOver(d, id)} )
            .on("mouseout", function (d) { return mouseOut(d.genre)} );

    // add the x Axis
    svg.append("g")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "axisHome"; } })
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(20, "s"));

    // add the y Axis
    svg.append("g")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "axisHome"; } })
        .call(d3.axisLeft(y));

    // add the title
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y", -10)
        .style("text-anchor", "middle")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "titleHome"; } })
        .text(title);
}