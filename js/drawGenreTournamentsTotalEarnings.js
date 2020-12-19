// set the dimensions and margins of the graph
var margin4 = { top: 20, right: 0, bottom: 30, left: 0 },
    width4 = 1150 - margin4.left - margin4.right,
    height4 = 400 - margin4.top - margin4.bottom;

const radius = Math.min(width4, height4) / 2;

const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

// The arcs generators
var arc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 0.8)

var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

// create svg
var svg4 = d3.select("#chart-genre-earning")
    .append("svg")
        .attr("width", width4 + margin4.left + margin4.right)
        .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
        .attr("transform",`translate(${width4 / 2}, ${height4 / 2})`);


const drawGenreTournamentsTotalEarnings = (minMaxReleaseDate, drawGenreTournamentsTotalEarnings) => {
    // data
    var groupData = {};
    Object.keys(drawGenreTournamentsTotalEarnings).forEach(releaseDate => {
        if (minMaxReleaseDate[0] <= releaseDate && releaseDate <= minMaxReleaseDate[1]) {
            drawGenreTournamentsTotalEarnings[releaseDate].forEach(data => {
                if (!(data.genre in groupData)) {
                    groupData[data.genre] = 0;
                }
                groupData[data.genre] += data.earnings;
            });
        }
    });
    groupData = pie(d3.entries(getObjectsWithHighestValue(groupData, 4)));

    // clean draw
    svg4.selectAll("*").remove();

    // Insert Data on Graph
    svg4.selectAll('allSlices')
        .data(groupData)
        .enter()
        .append('path')
            .attr('d', arc)
            .attr('fill', function(d){ return color(d.data.key); })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

    // Legend Line
    svg4.selectAll('allPolylines')
        .data(groupData)
        .enter()
        .append('polyline')
            .attr("stroke", "white")
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
    svg4.selectAll('allLabels')
        .data(groupData)
        .enter()
        .append('text')
            .style("fill", "white")
            .text( function(d) { return d.data.key + ' (' + numFormatter(d.data.value) + ')'; } )
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