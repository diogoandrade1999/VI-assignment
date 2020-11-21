Array.min = array => {
    return Math.min.apply(Math, array);
};

Array.max = array => {
    return Math.max.apply(Math, array);
};


d3.csv("/js/data/GeneralEsportData.csv", function (data) {
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
    var groupGenre = {};
    var groupGenreTotalEarnings = {};
    var releaseDateList = [];
    data.forEach(d => {
        var genre = d.genre;
        var releaseDate = d.releaseDate;
        if (!(genre in groupGenre)) {
            groupGenre[genre] = [];
            groupGenreTotalEarnings[genre] = {};
        }
        groupGenre[genre].push(d);
        if (!(releaseDate in groupGenreTotalEarnings[genre])) {
            groupGenreTotalEarnings[genre][releaseDate] = 0;
        }
        groupGenreTotalEarnings[genre][releaseDate] += d.totalEarnings;
        if (!releaseDateList.includes(d.releaseDate)) {
            releaseDateList.push(d.releaseDate);
        }
    });
    const minMaxReleaseDate = [Array.min(releaseDateList), Array.max(releaseDateList)];

    // init
    makeList(groupGenre);
    drawGenreTotalEarnings(minMaxReleaseDate, groupGenreTotalEarnings);

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
            drawGenreTotalEarnings([ui.values[0], ui.values[1]], groupGenreTotalEarnings);
        }
    });

});