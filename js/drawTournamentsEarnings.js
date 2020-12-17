// set the dimensions and margins of the graph
var margin3 = { top: 50, right: 10, bottom: 30, left: 240 },
    width3 = 1240 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// create svg
var svg3 = d3.select("#chart-tournament-earning")
    .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin3.left + "," + margin3.top + ")");


const drawTournamentsEarnings = (minMaxReleaseDate, groupTournamentsEarnings) => {
    // data
    var groupData = [];
    Object.keys(groupTournamentsEarnings).forEach(releaseDate => {
        if (minMaxReleaseDate[0] <= releaseDate && releaseDate <= minMaxReleaseDate[1]) {
            groupTournamentsEarnings[releaseDate].forEach(data => {
                groupData.push(data);
            });
        }
    });
    groupData.sort((a, b) => (a.earnings > b.earnings) ? 1 : ((b.earnings > a.earnings) ? -1 : 0));
    groupData = groupData.slice(groupData.length - 10);

    // clean draw
    svg3.selectAll("*").remove();

    // set the ranges
    var x2 = d3.scaleLinear()
        .range([0, width2])
        .domain([0, d3.max(groupData, function (d) {
            return d.earnings;
        })]);

    var y2 = d3.scaleBand()
        .range([height2, 0])
        .padding(0.1)
        .domain(groupData.map(function (d) {
            return d.game;
        }));

    // append the rectangles for the bar chart
    svg3.selectAll(".bar")
        .data(groupData)
        .enter().append("rect")
        .attr("class", function (d) { return "bar " + d.genre.replaceAll(" ", ""); })
        .style("fill", function (d) { return color(d.genre); })
        .attr("width", function (d) { return x2(d.earnings); })
        .attr("y", function (d) { return y2(d.game); })
        .attr("height", y2.bandwidth())
        .on("mouseover", function (d) {
            d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre)).darker(2));
            if (!window.location.pathname.includes('/graphics.html')) {
                $('#tournament-trailer').html('<iframe width="800" height="390" src="' + games_data[d.game].trailer + '" frameborder="0" allowfullscreen></iframe>');
                $('#tournament-image').html('<img src="img/' + games_data[d.game].image + '" alt="game-image" width="620">');
                $('#tournament-description').html('<h1><b>' + d.game + '</b></h1>' + 
                                            '</br><h3>' + games_data[d.game].description + '</h3>' +
                                            '</br><h3><b>Genre:</b> ' + d.genre + '</h3>');
            }
        })
        .on("mouseout", function (d) {
            d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", color(d.genre));
        });

    // add the x Axis
    svg3.append("g")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "axisHome"; } })
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x2).ticks(20, "s"));

    // add the y Axis
    svg3.append("g")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "axisHome"; } })
        .call(d3.axisLeft(y2));

    svg3.append("text")
        .attr("x", width2 / 2 )
        .attr("y", -10)
        .style("text-anchor", "middle")
        .attr("class", function (d) { if (!window.location.pathname.includes('/graphics.html')) { return "titleHome"; } })
        .text(function (d) {
            if (!window.location.pathname.includes('/graphics.html')) {
                return "2019's Tournaments Earnings per Game";
            }
            return "Tournaments Earnings per Game";
        });

    // init on home
    if (!window.location.pathname.includes('/graphics.html')) {
        $('#tournament-trailer').html('<iframe width="800" height="390" src="' + games_data["Fortnite"].trailer +'" frameborder="0" allowfullscreen></iframe>');
        $('#tournament-image').html('<img src="img/' + games_data["Fortnite"].image +'" alt="game-image" width="620">');
        $('#tournament-description').html('<h1><b>Fortnite</b></h1>' + 
                                    '</br><h3>' + games_data["Fortnite"].description + '</h3>' +
                                    '</br><h3><b>Genre:</b> Battle Royale</h3>');
    }
}