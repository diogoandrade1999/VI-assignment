Array.min = array => {
    return Math.min.apply(Math, array);
};

Array.max = array => {
    return Math.max.apply(Math, array);
};

const color = d3.scaleOrdinal(d3.schemeCategory10);

const games_data = {
    "Call of Duty: Modern Warfare": {
        "image": "call-of-duty-modern-warfre.jpg",
        "trailer": "",
        "description": "Call of Duty: Modern Warfare é um jogo eletrônico de tiro em primeira pessoa produzido pela Infinity Ward. Foi publicado pela Activision em 25 de outubro de 2019 para Microsoft Windows, PlayStation 4 e Xbox One. É o decimo sexto jogo da serie Call of Duty e actua como um 'soft reboot' da sub-serie Modern Warfare."
    },
    "Apex Legends": {
        "image": "apex-legends.png",
        "trailer": "",
        "description": "Apex Legends é um jogo eletrônico free-to-play do gênero battle royale desenvolvido pela Respawn Entertainment e publicado pela Electronic Arts. Situado no mesmo universo da série Titanfall, o jogo foi revelado e lançado em um anúncio surpresa em 4 de fevereiro de 2019 para Microsoft Windows, Xbox One e PlayStation 4."
    },
    "Gears 5": {
        "image": "gears-5.jpg",
        "trailer": "",
        "description": "Gears 5 é um jogo eletrônico de tiro em terceira pessoa desenvolvido pela The Coalition e publicado pela Xbox Game Studios. Foi lançado em 6 de setembro de 2019 para Xbox One e Windows 10 como parte do Xbox Play Anywhere. É o sexto título da série Gears of War e a continuação de Gears of War 4."
    },
    "FIFA 20": {
        "image": "fifa20.png",
        "trailer": "",
        "description": "FIFA 20 é um jogo eletrônico de futebol desenvolvido e publicado pela EA Sports, lançado mundialmente em 19 de setembro de 2019. Este é o vigésimo sétimo título da série FIFA e o quarto a usar o mecanismo de jogo da Frostbite para Xbox One, PS4 e PC."
    },
    "Auto Chess": {
        "image": "auto-chess.jpg",
        "trailer": "",
        "description": "Dota Auto Chess is a strategy video game mod for the video game Dota 2. Developed by Drodo Studio and released in January 2019, the game features elements of chess and supports up to eight players. The popularity of the mod, with its having over eight million players by May 2019, led to the creation of the auto battler genre that had a number of other games being released. Later in 2019, Drodo Studio developed a standalone version known simply as Auto Chess, while Valve, the developer of Dota 2, developed their own standalone version known as Dota Underlords."
    },
    "Teamfight Tactics": {
        "image": "teamfight-tactics.png",
        "trailer": "",
        "description": "O Teamfight Tactics é um jogo gratuito de estratégia e auto chess desenvolvido e publicado pela Riot Games. O jogo se passa no universo de League of Legends e é baseado no Dota Auto Chess, onde os jogadores competem online contra outros sete adversários, construindo uma equipe para ser a última em pé."
    },
    "F1 2019": {
        "image": "f1-2019.jpg",
        "trailer": "",
        "description": "F1 2019 é um jogo eletrônico de corrida baseado na temporada de Fórmula 1 de 2019. O jogo é desenvolvido e publicado pela Codemasters e é o décimo segundo título da série Formula One desenvolvida pelo estúdio. O jogo foi anunciado pela Codemasters em 28 de março de 2019."
    },
    "TEPPEN": {
        "image": "teppen.jpg",
        "trailer": "",
        "description": "Teppen é um jogo de cartas digital colecionável gratuito desenvolvido pela GungHo Online Entertainment e Capcom. Foi lançado na América do Norte e na Europa em 4 de julho de 2019 e na Ásia em 08 de agosto para Android e iOS."
    },
    "Mortal Kombat 11": {
        "image": "mortal-kombat11.jpg",
        "trailer": "",
        "description": "Mortal Kombat 11 é um jogo eletrônico de luta desenvolvido pela NetherRealm Studios e publicado pela Warner Bros. Interactive Entertainment. É a décima primeira edição principal da série de jogos eletrônicos de luta, Mortal Kombat, e uma continuação direta de Mortal Kombat X."
    },
    "Pro Evolution Soccer 2019": {
        "image": "pes2019.png",
        "trailer": "",
        "description": "Pro Evolution Soccer 2019, é um jogo de futebol desenvolvido pela PES Production e publicado pela Konami para Microsoft Windows, PlayStation 4 e Xbox One, e que pertence à série Pro Evolution Soccer. O lançamento ocorreu no dia 28 de Agosto de 2018 para as Américas e 30 de Agosto de 2018 para o resto do mundo."
    },
    "Fortnite": {
        "image": "fortnite.jpg",
        "trailer": "https://youtu.be/Fcl30mWtJQU",
        "description": ""
    },
    "Dota 2": {
        "image": "dota-2.jpg",
        "trailer": "https://youtu.be/Ii_EjA7bqYw",
        "description": ""
    },
    "Counter-Strike: Global Offensive": {
        "image": "csgo.jpg",
        "trailer": "",
        "description": ""
    },
    "PLAYERUNKNOWN'S BATTLEGROUNDS": {
        "image": "pb.jpeg",
        "trailer": "",
        "description": ""
    },
    "Overwatch": {
        "image": "overwatch.jpg",
        "trailer": "",
        "description": ""
    },
    "League of Legends": {
        "image": "league-of-legends.jpg",
        "trailer": "",
        "description": ""
    },
    "Arena of Valor": {
        "image": "arena-of-valor.png",
        "trailer": "",
        "description": ""
    },
    "Call of Duty: Black Ops 4": {
        "image": "black-ops-4.jpg",
        "trailer": "",
        "description": ""
    },
    "Rainbow Six Siege": {
        "image": "rainbow-six-siege.jpg",
        "trailer": "",
        "description": ""
    },
    "Hearthstone": {
        "image": "hearthstone.png",
        "trailer": "https://youtu.be/8GHv3I9aDM8",
        "description": ""
    },
};

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
    if (window.location.pathname.includes('/graphics.html')) {
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
    } else {
        drawGameTotalEarnings([2019, 2019], groupGameTotalEarnings);
    }
});

d3.csv("https://diogoandrade1999.github.io/esports.earnings/data/TournamentsData.csv", function (data) {
    if (1998 <= +data.Year && +data.Year <= 2019) {
        return {
            game: data.Game,
            genre: data.Genre,
            year: +data.Year,
            earnings: +data.Earnings,
            players: +data.Players,
            tournaments: +data.Tournaments
        }
    }
}).then(data => {
    var groupTournamentsEarnings = {};
    data.forEach(d => {
        var year = d.year;
        if (!(year in groupTournamentsEarnings)) {
            groupTournamentsEarnings[year] = [];
        }
        groupTournamentsEarnings[year].push(d);
    });

    // init
    if (!window.location.pathname.includes('/graphics.html')) {
        drawTournamentsEarnings([2019, 2019], groupTournamentsEarnings);
    }
});
