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


const drawGenreTournamentsTotalEarnings = (minMaxReleaseDate, drawGenreTournamentsTotalEarnings, numGenre, genreList) => {
    // data
    var groupData = {};
    Object.keys(drawGenreTournamentsTotalEarnings).forEach(releaseDate => {
        if (minMaxReleaseDate[0] <= releaseDate && releaseDate <= minMaxReleaseDate[1]) {
            drawGenreTournamentsTotalEarnings[releaseDate].forEach(data => {
                if (genreList.includes(data.genre)) {
                    if (!(data.genre in groupData)) {
                        groupData[data.genre] = 0;
                    }
                    groupData[data.genre] += data.earnings;
                }
            });
        }
    });
    groupData = pie(d3.entries(getObjectsWithHighestValue(groupData, numGenre)));

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
            .style("opacity", 0.7)
            .attr("class", function (d) { return "bar " + d.data.key.replaceAll(" ", ""); })
            .style("fill", function (d) { return color(d.data.key); })
            .on("mouseover", function (d) {
                d3.selectAll("." + d.data.key.replaceAll(" ", "")).style("fill", d3.rgb(color(d.data.key)).darker(2));
                if (!window.location.pathname.includes('/graphics.html')) {
                    $('#game-trailer').html('<iframe width="800" height="390" src="' + games_data[d.game].trailer + '" frameborder="0" allowfullscreen></iframe>');
                    $('#game-image').html('<img src="img/' + games_data[d.game].image + '" alt="game-image" width="620">');
                    $('#game-description').html('<h1><b>' + d.game + '</b></h1>' + 
                                                '</br><h3>' + games_data[d.game].description + '</h3>' +
                                                '</br><h3><b>Genre:</b> ' + d.genre + '</h3>');
                }
            })
            .on("mouseout", function (d) {
                d3.selectAll("." + d.data.key.replaceAll(" ", "")).style("fill", color(d.data.key));
            });

    // Legend Line
    svg4.selectAll('allPolylines')
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
    svg4.selectAll('allLabels')
        .data(groupData)
        .enter()
        .append('text')
            .style("fill", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "white"; } return "black"; })
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