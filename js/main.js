Array.min = array => {
    return Math.min.apply(Math, array);
};

Array.max = array => {
    return Math.max.apply(Math, array);
};

const color = d3.scaleOrdinal(d3.schemeCategory10);


d3.csv("https://diogoandrade1999.github.io/esports.earnings/data/GeneralEsportData.csv", function (data) {
    if (1998 <= +data.ReleaseDate && +data.ReleaseDate <= 2019) {
        return {
            genre: data.Genre,
            game: data.Game,
            releaseDate: +data.ReleaseDate,
            totalEarnings: +data.TotalEarnings,
            onlineEarnings: +data.OnlineEarnings,
            totalPlayers: +data.TotalPlayers,
            totalTournaments: +data.TotalTournaments
        }
    }
}).then(data => {
    var groupGenreTotalEarnings = {};
    var groupGameTotalEarnings = {};
    var genreList = [];
    var releaseDateList = [];
    data.forEach(d => {
        var genre = d.genre;
        var game = d.game;
        var totalEarnings = d.totalEarnings;
        var releaseDate = d.releaseDate;
        if (!(genre in groupGenreTotalEarnings)) {
            groupGenreTotalEarnings[genre] = {};
        }
        if (!(releaseDate in groupGenreTotalEarnings[genre])) {
            groupGenreTotalEarnings[genre][releaseDate] = 0;
        }
        groupGenreTotalEarnings[genre][releaseDate] += totalEarnings;

        if (!(releaseDate in groupGameTotalEarnings)) {
            groupGameTotalEarnings[releaseDate] = [];
        }
        groupGameTotalEarnings[releaseDate].push({ "game": game, "totalEarnings": totalEarnings, "genre": genre });
        if (!genreList.includes(genre)) {
            genreList.push(genre);
        }
        if (!releaseDateList.includes(releaseDate)) {
            releaseDateList.push(releaseDate);
        }
    });
    const minMaxReleaseDate = [Array.min(releaseDateList), Array.max(releaseDateList)];

    // init
    $("#min-year").html(minMaxReleaseDate[0]);
    $("#max-year").html(minMaxReleaseDate[1]);
    makeList(genreList);
    drawGenreTotalEarnings(minMaxReleaseDate, groupGenreTotalEarnings);
    drawGameTotalEarnings(minMaxReleaseDate, groupGameTotalEarnings);

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
        min: minMaxReleaseDate[0],
        max: minMaxReleaseDate[1],
        values: minMaxReleaseDate,
        step: 1,
        slide: function (event, ui) {
            // labels
            $("#min-year").html(ui.values[0]);
            $("#max-year").html(ui.values[1]);
            // draw
            drawGenreTotalEarnings([ui.values[0], ui.values[1]], groupGenreTotalEarnings);
            drawGameTotalEarnings([ui.values[0], ui.values[1]], groupGameTotalEarnings);
        }
    });

});