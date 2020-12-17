Array.min = array => {
    return Math.min.apply(Math, array);
};

Array.max = array => {
    return Math.max.apply(Math, array);
};

const color = d3.scaleOrdinal(d3.schemeCategory10);


d3.csv("data/parsedData.csv", function (data) {
    if (1998 <= +data.Year && +data.Year <= 2019) {
        return {
            genre: data.Genre,
            game: data.Game,
            year: +data.Year,
            earnings: +data.Earnings,
            players: +data.Players,
            tournaments: +data.Tournaments
        }
    }
}).then(data => {
    var groupGenreEarnings = {};
    var groupGameEarnings = {};
    var genreData = [];
    var genreList = [];
    var yearList = [];
    data.forEach(d => {
        var genre = d.genre;
        var game = d.game;
        var earnings = d.earnings;
        var year = d.year;
        if (!(genre in groupGenreEarnings)) {
            groupGenreEarnings[genre] = {};
        }
        if (!(year in groupGenreEarnings[genre])) {
            groupGenreEarnings[genre][year] = 0;
        }
        groupGenreEarnings[genre][year] += earnings;

        if (!(year in groupGameEarnings)) {
            groupGameEarnings[year] = [];
        }
        
        groupGameEarnings[year].push({ "game": game, "earnings": earnings, "genre": genre });
        if (!genreList.includes(genre)) {
            genreList.push(genre);
        }
        if (!yearList.includes(year)) {
            yearList.push(year);
        }
    });

    Object.keys(groupGenreEarnings).forEach(genre => {
        Object.keys(groupGenreEarnings[genre]).forEach(releaseDate => {
            genreData.push({ "genre": genre, "year": releaseDate, "earnings": groupGenreEarnings[genre][releaseDate]});
        });
    });

    const minMaxYear = [Array.min(yearList), Array.max(yearList)];

    // init
    $("#min-year").html(minMaxYear[0]);
    $("#max-year").html(minMaxYear[1]);
    makeList(genreList);
    //console.log(data);
    drawGenreTotalEarnings(minMaxYear, yearList.sort(), genreData);
    drawGameTotalEarnings(minMaxYear, groupGameEarnings);

    $('#videogame-genre-list input:checkbox').on('click', function () {
        console.log(this);
        if ($(this).attr("id") == 'genre-all') {
            $('#videogame-genre-list input:checkbox').not(this).prop("checked", this.checked);
        } else {
            $(this).attr("checked", !$(this).attr("checked"));
        }
    });

    $("#slider").slider({
        range: true,
        min: minMaxYear[0],
        max: minMaxYear[1],
        values: minMaxYear,
        step: 1,
        slide: function (event, ui) {
            // labels
            $("#min-year").html(ui.values[0]);
            $("#max-year").html(ui.values[1]);
            // draw
            drawGenreTotalEarnings([ui.values[0], ui.values[1]], yearList.sort(), genreData);
            drawGameTotalEarnings([ui.values[0], ui.values[1]], groupGameEarnings);
        }
    });

});