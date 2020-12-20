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
    d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre)).darker(2));
    if (id) {
        $('#' + id + '-trailer').html('<iframe width="800" height="390" src="' + games_data[d.game].trailer + '" frameborder="0" allowfullscreen></iframe>');
        $('#' + id + '-image').html('<img src="img/' + games_data[d.game].image + '" alt="game-image" width="620">');
        $('#' + id + '-description').html('<h1><b>' + d.game + '</b></h1>' + 
                                    '</br><h3>' + games_data[d.game].description + '</h3>' +
                                    '</br><h3><b>Genre:</b> ' + d.genre + '</h3>');
    }
}

const legendSvg = (svg, width, genreList) => {
    //Legend
    var legend = svg.selectAll(".legend")
        .data(genreList)
        .enter()
        .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
            .style("opacity", "0");

    legend.append("rect")
        .attr("class", function (d) { return d.replaceAll(" ", ""); })
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return color(d); })
        .on("mouseover", function (d) {
            d3.selectAll("." + d.replaceAll(" ", "")).style("fill", d3.rgb(color(d)).darker(2));
        })
        .on("mouseout", function (d) {
            d3.selectAll("." + d.replaceAll(" ", "")).style("fill", color(d));
        });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) { return d; });

    legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");
}

const gameData = (minMaxReleaseDate, minMaxYear, genreList, gameData, numGames) => {
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
        groupData.push({ "name": game, "genre": genre, "totalEarnings": totalEarnings });
    });
    groupData.sort((a, b) => (a.totalEarnings > b.totalEarnings) ? 1 : ((b.totalEarnings > a.totalEarnings) ? -1 : 0));
    groupData = groupData.slice(groupData.length - numGames);
    return groupData;
}

const genreData = (minMaxReleaseDate, minMaxYear, genreList, genreData, numGenres) => {
    var groupData = [];
    Object.entries(genreData).forEach(([genre, data]) => {
        var totalEarnings = 0;
        data.forEach(d => {
            if (minMaxReleaseDate[0] <= d.releaseDate &&
                d.releaseDate <= minMaxReleaseDate[1] &&
                minMaxYear[0] <= d.year &&
                d.year <= minMaxYear[1] &&
                genreList.includes(d.genre)) {
                    totalEarnings += d.totalEarnings;
            }
        });
        groupData.push({ "name": genre, "genre": genre, "totalEarnings": totalEarnings });
    });
    groupData.sort((a, b) => (a.totalEarnings > b.totalEarnings) ? 1 : ((b.totalEarnings > a.totalEarnings) ? -1 : 0));
    groupData = groupData.slice(groupData.length - numGenres);
    return groupData;
}
