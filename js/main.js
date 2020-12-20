// https://diogoandrade1999.github.io/esports.earnings/
d3.csv("data/EsportsData.csv", function (data) {
    if (1998 <= +data.Release && +data.Release <= 2019) {
        return {
            game: data.Game,
            genre: data.Genre,
            releaseDate: +data.Release,
            year: +data.Year,
            totalEarnings: +data.Earnings,
            players: +data.Players,
            tournaments: +data.Tournaments
        }
    }
}).then(data => {
    var groupGenre = {};
    var groupGame = {};
    var genreList = [];
    var releaseDateList = [];
    var yearList = [];
    data.forEach(d => {
        var genre = d.genre;
        var game = d.game;
        var releaseDate = d.releaseDate;
        var year = d.year;

        if (!(genre in groupGenre)) {
            groupGenre[genre] = [];
        }
        groupGenre[genre].push(d);
        
        if (!(game in groupGame)) {
            groupGame[game] = [];
        }
        groupGame[game].push(d);

        if (!genreList.includes(genre)) {
            genreList.push(genre);
        }
        if (!releaseDateList.includes(releaseDate)) {
            releaseDateList.push(releaseDate);
        }
        if (!yearList.includes(year)) {
            yearList.push(year);
        }
    });
    const minMaxReleaseDate = [Array.min(releaseDateList), Array.max(releaseDateList)];
    const minMaxYear = [Array.min(yearList), Array.max(yearList)];

    if (window.location.pathname.includes('/graphics.html')) {
        // init
        $("#min-year").html(minMaxReleaseDate[0]);
        $("#max-year").html(minMaxReleaseDate[1]);
        makeList(genreList);

        var workedData = genreData(minMaxReleaseDate, minMaxYear, genreList, groupGenre, 10);
        drawLineChart(workedData, svg1, width1, height1, "Top 10 Tournaments Earnings per Game", null);

        var workedData = gameData(minMaxReleaseDate, minMaxYear, genreList, groupGame, 10);
        drawBarChart(workedData, svg2, width2, height2, "Top 10 Tournaments Earnings per Game", null);

        var workedData = genreData(minMaxReleaseDate, minMaxYear, genreList, groupGenre, 10);
        drawBarChart(workedData, svg3, width3, height3, "Top 10 Tournaments Earnings per Genre", null);

        var workedData = genreData(minMaxReleaseDate, minMaxYear, genreList, groupGenre, 5);
        drawPieChart(workedData, svg4, null);

        // Genre Checkbox List
        $('input[name ="genre"]').on('click', function () {
            if ($(this).attr("checked")) {
                genreList = Array.remove(genreList, $(this).val());
            } else {
                genreList.push($(this).val());
            }
            $(this).attr("checked", !$(this).attr("checked"));

            // draw
            var releaseDates = [$("#min-year").text(), $("#max-year").text()];

            drawGenreTotalEarnings([$("#min-year").text(), $("#max-year").text()], groupGenre, genreList);

            var workedData = gameData(releaseDates, minMaxYear, genreList, groupGame, 10);
            drawBarChart(workedData, svg2, width2, height2, "Top 10 Tournaments Earnings per Game", null);

            var workedData = gameData(releaseDates, minMaxYear, genreList, groupGenre, 10);
            drawBarChart(workedData, svg3, width3, height3, "Top 10 Tournaments Earnings per Genre", null);

            var workedData = genreData(releaseDates, minMaxYear, genreList, groupGenre, 5);
            drawPieChart(workedData, svg4, null);
        });

        // Release Dates Slides
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
                var releaseDates = [ui.values[0], ui.values[1]];

                drawGenreTotalEarnings([ui.values[0], ui.values[1]], groupGenre, genreList);

                var workedData = gameData(releaseDates, minMaxYear, genreList, groupGame, 10);
                drawBarChart(workedData, svg2, width2, height2, "Top 10 Tournaments Earnings per Game", null);

                var workedData = gameData(releaseDates, minMaxYear, genreList, groupGenre, 10);
                drawBarChart(workedData, svg3, width3, height3, "Top 10 Tournaments Earnings per Genre", null);

                var workedData = genreData(releaseDates, minMaxYear, genreList, groupGenre, 5);
                drawPieChart(workedData, svg4, null);
            }
        });
    } else {
        // init
        var workedData = gameData([2019, 2019], [2019, 2019], genreList, groupGame, 10);
        drawBarChart(workedData, svg2, width2, height2, "2019's Games Earnings", "game");

        var workedData = gameData(minMaxReleaseDate, [2019, 2019], genreList, groupGame, 10);
        drawBarChart(workedData, svg3, width3, height3, "2019's Tournaments Earnings per Game", "tournament");

        var workedData = genreData(minMaxReleaseDate, [2019, 2019], genreList, groupGenre, 4);
        drawPieChart(workedData, svg4, null);

        $('#game-trailer').html('<iframe width="800" height="390" src="' + games_data["Call of Duty: Modern Warfare"].trailer +'" frameborder="0" allowfullscreen></iframe>');
        $('#game-image').html('<img src="img/' + games_data["Call of Duty: Modern Warfare"].image +'" alt="game-image" width="620">');
        $('#game-description').html('<h1><b>Call of Duty: Modern Warfare</b></h1>' + 
                                    '</br><h3>' + games_data["Call of Duty: Modern Warfare"].description + '</h3>' +
                                    '</br><h3><b>Genre:</b> First-Person Shooter</h3>');

        $('#tournament-trailer').html('<iframe width="800" height="390" src="' + games_data["Fortnite"].trailer +'" frameborder="0" allowfullscreen></iframe>');
        $('#tournament-image').html('<img src="img/' + games_data["Fortnite"].image +'" alt="game-image" width="620">');
        $('#tournament-description').html('<h1><b>Fortnite</b></h1>' + 
                                    '</br><h3>' + games_data["Fortnite"].description + '</h3>' +
                                    '</br><h3><b>Genre:</b> Battle Royale</h3>');
    }
});
