const drawLineChart = (groupData, svg, width, height, title, id) => {
    // clean draw
    svg.selectAll("*").remove();

    // set the ranges
    var x0 = d3.scaleBand()
        .range([0, width])
        .padding(0.5)
        .domain(releaseDates);
    var x1 = d3.scaleBand()
        .domain(Object.keys(groupGenreTotalEarnings))
        .range([0, x0.bandwidth()]);
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, Array.max(totalEarningsList)]);

    var xAxis = d3.axisBottom()
        .scale(x0)
        .tickValues(releaseDates);
    var yAxis = d3.axisLeft().ticks(20, "s")
        .scale(y);

    // add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight', 'bold')
            .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    groupData = d3.entries(groupData);

    var slice = svg.selectAll(".slice")
        .data(groupData)
        .enter()
        .append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + x0(d.key) + ",0)"; });

    slice.selectAll("rect")
        .data(function (d) { return d.value; })
        .enter()
        .append("rect")
            .attr("class", function (d) { return d.genre.replaceAll(" ", ""); })
            .attr("width", x1.bandwidth())
            .attr("x", function (d) { return x1(d.genre); })
            .style("fill", function (d) { return color(d.genre); })
            .attr("y", function (d) { return y(0); })
            .attr("height", function (d) { return height - y(0); })
            .on("mouseover", function (d) {
                d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre)).darker(2));
            })
            .on("mouseout", function (d) {
                d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", color(d.genre));
            });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) { return Math.random() * 1000; })
        .duration(1000)
        .attr("y", function (d) { return y(d.totalEarnings); })
        .attr("1", function (d) { return height - y(d.totalEarnings); });
}