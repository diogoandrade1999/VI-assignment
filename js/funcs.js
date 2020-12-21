Array.min = array => {
    return Math.min.apply(Math, array);
};

Array.max = array => {
    return Math.max.apply(Math, array);
};

Array.remove = (array, ignore) => {
    var new_array = [];
    array.forEach(element => {
        if (element != ignore) {
            new_array.push(element);
        }
    });
    return new_array
};


const numFormatter = num => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num;
}

const mouseOver = (d, id) => {
    d3.selectAll(".bar." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre.replaceAll(" ", ""))).darker(2));
    d3.selectAll(".line." + d.genre.replaceAll(" ", "")).style("stroke", d3.rgb(color(d.genre.replaceAll(" ", ""))).darker(2));
    if (id) {
        $('#' + id + '-trailer').html('<iframe width="800" height="390" src="' + games_data[d.name].trailer + '" frameborder="0" allowfullscreen></iframe>');
        $('#' + id + '-image').html('<img src="img/' + games_data[d.name].image + '" alt="game-image" width="620">');
        $('#' + id + '-description').html('<h1><b>' + d.name + '</b></h1>' + 
                                    '</br><h3>' + games_data[d.name].description + '</h3>' +
                                    '</br><h3><b>Genre:</b> ' + d.genre + '</h3>');
    }
}

const mouseOut = genre => {
    d3.selectAll(".bar." + genre.replaceAll(" ", "")).style("fill", color(genre.replaceAll(" ", "")));
    d3.selectAll(".line." + genre.replaceAll(" ", "")).style("stroke", color(genre.replaceAll(" ", "")));
}

const legendSvg = (svg, genreList, id) => {
    // clean draw
    svg.selectAll("*").remove();

    //Legend
    var legend = svg.selectAll(".legend")
        .data(genreList)
        .enter()
        .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 25 + ")"; })
            .style("opacity", "0");

    legend.append("rect")
        .attr("class", function (d) { return "bar " + d.replaceAll(" ", ""); })
        .attr("x", 165)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return color(d.replaceAll(" ", "")); })
        .on("mouseover", function (d) { return mouseOver({"genre": d}, id)} )
        .on("mouseout", function (d) { return mouseOut(d)} );

    legend.append("text")
        .attr("x", 155)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("font-size", "14px")
        .style("text-anchor", "end")
        .text(function (d) { return d; });

    legend.transition()
        .duration(10)
        .delay(function (d, i) { return 100 + 100 * i; })
        .style("opacity", "1");
}

const gameDataBar = (minMaxReleaseDate, minMaxYear, genreList, gameData, numGames) => {
    var groupData = [];
    Object.entries(gameData).forEach(([game, data]) => {
        var totalEarnings = 0;
        var genre = null;
        data.forEach(d => {
            if (minMaxReleaseDate[0] <= d.releaseDate &&
                d.releaseDate <= minMaxReleaseDate[1] &&
                minMaxYear[0] <= d.year &&
                d.year <= minMaxYear[1] &&
                genreList.includes(d.genre)) {
                    totalEarnings += d.totalEarnings;
                    if (!genre) {
                        genre = d.genre;
                    }
            }
        });
        if (genre) {
            groupData.push({ "name": game, "genre": genre, "totalEarnings": totalEarnings });
        }
    });
    groupData.sort((a, b) => (a.totalEarnings > b.totalEarnings) ? -1 : ((b.totalEarnings > a.totalEarnings) ? 1 : 0));
    groupData = groupData.slice(0, numGames).reverse();
    return groupData;
}

const genreDataBar = (minMaxReleaseDate, minMaxYear, genreList, genreData, numGenres) => {
    var groupData = [];
    Object.entries(genreData).forEach(([genre, data]) => {
        if (genreList.includes(genre)) {
            var totalEarnings = 0;
            data.forEach(d => {
                if (minMaxReleaseDate[0] <= d.releaseDate &&
                    d.releaseDate <= minMaxReleaseDate[1] &&
                    minMaxYear[0] <= d.year &&
                    d.year <= minMaxYear[1]) {
                        totalEarnings += d.totalEarnings;
                }
            });
            groupData.push({ "name": genre, "genre": genre, "totalEarnings": totalEarnings });
        }
    });
    groupData.sort((a, b) => (a.totalEarnings > b.totalEarnings) ? -1 : ((b.totalEarnings > a.totalEarnings) ? 1 : 0));
    groupData = groupData.slice(0, numGenres).reverse();
    return groupData;
}

const genreDataLine = (minMaxReleaseDate, minMaxYear, genreList, genreData) => {
    var groupData = [];
    var years = [];
    var maxEarnings = 0;
    Object.entries(genreData).forEach(([genre, data]) => {
        if (genreList.includes(genre)) {
            var totalEarnings = {};
            data.forEach(d => {
                if (minMaxReleaseDate[0] <= d.releaseDate &&
                    d.releaseDate <= minMaxReleaseDate[1] &&
                    minMaxYear[0] <= d.year &&
                    d.year <= minMaxYear[1]) {
                        if (!(d.year in totalEarnings)) {
                            totalEarnings[d.year] = 0;
                        }
                        totalEarnings[d.year] += d.totalEarnings;
                        if (!years.includes(d.year)) {
                            years.push(d.year);
                        }
                }
            });
            var dataPoints = [];
            Object.entries(totalEarnings).forEach(([year, earnings]) => {
                dataPoints.push({ "name": genre, "year": year, "totalEarnings": earnings });
                if (earnings > maxEarnings) {
                    maxEarnings = earnings;
                }
            });
            groupData.push({ "name": genre, "datapoints": dataPoints });
        }
    });
    return [groupData, years, maxEarnings];
}