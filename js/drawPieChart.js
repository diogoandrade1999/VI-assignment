const drawPieChart = (groupData, svg, id) => {
    // data
    groupData = pie(d3.entries(groupData));

    // clean draw
    svg.selectAll("*").remove();

    // Insert Data on Graph
    svg.selectAll('allSlices')
        .data(groupData)
        .enter()
        .append('path')
            .attr('d', arc)
            .attr("class", function (d) { return "bar " + d.data.value.genre.replaceAll(" ", ""); })
            .attr('fill', function(d){ return color(d.data.value.genre); })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .on("mouseover",  function (d) { return mouseOver(d.data.value, id)} )
            .on("mouseout", function (d) { return mouseOut(d.data.value.genre)} );

    // Legend Line
    svg.selectAll('allPolylines')
        .data(groupData)
        .enter()
        .append('polyline')
            .attr("stroke", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "white"; } return "black"; })
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function(d) {
                var posA = arc.centroid(d);
                var posB = outerArc.centroid(d);
                var posC = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

    // Legend Text
    svg.selectAll('allLabels')
        .data(groupData)
        .enter()
        .append('text')
            .style("fill", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "white"; } return "black"; })
            .text( function(d) { return d.data.value.name + ' (' + numFormatter(d.data.value.totalEarnings) + ')'; } )
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? 'start' : 'end');
            });
}