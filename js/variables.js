const color = d3.scaleOrdinal(d3.schemeCategory10);

// set the dimensions and margins of the graph
var margin1 = { top: 20, right: 0, bottom: 30, left: 90 },
    width1 = 1450 - margin1.left - margin1.right,
    height1 = 400 - margin1.top - margin1.bottom;

// create svg
var svg1 = d3.select("#chart-year-earning")
    .append("svg")
        .attr("width", width1 + margin1.left + margin1.right)
        .attr("height", height1 + margin1.top + margin1.bottom)
        .append("g")
            .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

// set the dimensions and margins of the graph
var margin2 = { top: 50, right: 10, bottom: 30, left: 240 },
    width2 = 1240 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;

// create svg
var svg2 = d3.select("#chart-game-earning")
    .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
        .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

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
            .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

// set the dimensions and margins of the graph
var margin4 = { top: 20, right: 0, bottom: 30, left: 0 },
    width4 = 1150 - margin4.left - margin4.right,
    height4 = 400 - margin4.top - margin4.bottom;

const radius = Math.min(width4, height4) / 2;

const pie = d3.pie()
    .value(d => d.value.totalEarnings)
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


const games_data = {
    "Call of Duty: Modern Warfare": {
        "image": "call-of-duty-modern-warfre.jpg",
        "trailer": "https://www.youtube.com/embed/bH1lHCirCGI",
        "description": "Call of Duty: Modern Warfare é um jogo eletrônico de tiro em primeira pessoa produzido pela Infinity Ward. Foi publicado pela Activision em 25 de outubro de 2019 para Microsoft Windows, PlayStation 4 e Xbox One. É o decimo sexto jogo da serie Call of Duty e actua como um 'soft reboot' da sub-serie Modern Warfare."
    },
    "Apex Legends": {
        "image": "apex-legends.png",
        "trailer": "https://www.youtube.com/embed/UMJb_mkqynU",
        "description": "Apex Legends é um jogo eletrônico free-to-play do gênero battle royale desenvolvido pela Respawn Entertainment e publicado pela Electronic Arts. Situado no mesmo universo da série Titanfall, o jogo foi revelado e lançado em um anúncio surpresa em 4 de fevereiro de 2019 para Microsoft Windows, Xbox One e PlayStation 4."
    },
    "Gears 5": {
        "image": "gears-5.jpg",
        "trailer": "https://www.youtube.com/embed/SEpWlFfpEkU",
        "description": "Gears 5 é um jogo eletrônico de tiro em terceira pessoa desenvolvido pela The Coalition e publicado pela Xbox Game Studios. Foi lançado em 6 de setembro de 2019 para Xbox One e Windows 10 como parte do Xbox Play Anywhere. É o sexto título da série Gears of War e a continuação de Gears of War 4."
    },
    "FIFA 20": {
        "image": "fifa20.png",
        "trailer": "https://www.youtube.com/embed/vgQNOIhRsV4",
        "description": "FIFA 20 é um jogo eletrônico de futebol desenvolvido e publicado pela EA Sports, lançado mundialmente em 19 de setembro de 2019. Este é o vigésimo sétimo título da série FIFA e o quarto a usar o mecanismo de jogo da Frostbite para Xbox One, PS4 e PC."
    },
    "Auto Chess": {
        "image": "auto-chess.jpg",
        "trailer": "https://www.youtube.com/embed/XZoGA7_vtLw",
        "description": "Dota Auto Chess is a strategy video game mod for the video game Dota 2. Developed by Drodo Studio and released in January 2019, the game features elements of chess and supports up to eight players. The popularity of the mod, with its having over eight million players by May 2019, led to the creation of the auto battler genre that had a number of other games being released. Later in 2019, Drodo Studio developed a standalone version known simply as Auto Chess, while Valve, the developer of Dota 2, developed their own standalone version known as Dota Underlords."
    },
    "Teamfight Tactics": {
        "image": "teamfight-tactics.png",
        "trailer": "https://www.youtube.com/embed/liNLLx874g4",
        "description": "O Teamfight Tactics é um jogo gratuito de estratégia e auto chess desenvolvido e publicado pela Riot Games. O jogo se passa no universo de League of Legends e é baseado no Dota Auto Chess, onde os jogadores competem online contra outros sete adversários, construindo uma equipe para ser a última em pé."
    },
    "F1 2019": {
        "image": "f1-2019.jpg",
        "trailer": "https://www.youtube.com/embed/zj1lVY8wrqk",
        "description": "F1 2019 é um jogo eletrônico de corrida baseado na temporada de Fórmula 1 de 2019. O jogo é desenvolvido e publicado pela Codemasters e é o décimo segundo título da série Formula One desenvolvida pelo estúdio. O jogo foi anunciado pela Codemasters em 28 de março de 2019."
    },
    "TEPPEN": {
        "image": "teppen.jpg",
        "trailer": "https://www.youtube.com/embed/cMxm0QvfjQM",
        "description": "Teppen é um jogo de cartas digital colecionável gratuito desenvolvido pela GungHo Online Entertainment e Capcom. Foi lançado na América do Norte e na Europa em 4 de julho de 2019 e na Ásia em 08 de agosto para Android e iOS."
    },
    "Mortal Kombat 11": {
        "image": "mortal-kombat11.jpg",
        "trailer": "https://www.youtube.com/embed/7zwQPJmg-Kg",
        "description": "Mortal Kombat 11 é um jogo eletrônico de luta desenvolvido pela NetherRealm Studios e publicado pela Warner Bros. Interactive Entertainment. É a décima primeira edição principal da série de jogos eletrônicos de luta, Mortal Kombat, e uma continuação direta de Mortal Kombat X."
    },
    "Pro Evolution Soccer 2019": {
        "image": "pes2019.png",
        "trailer": "https://www.youtube.com/embed/7fgZD42pGDo",
        "description": "Pro Evolution Soccer 2019, é um jogo de futebol desenvolvido pela PES Production e publicado pela Konami para Microsoft Windows, PlayStation 4 e Xbox One, e que pertence à série Pro Evolution Soccer. O lançamento ocorreu no dia 28 de Agosto de 2018 para as Américas e 30 de Agosto de 2018 para o resto do mundo."
    },
    "Fortnite": {
        "image": "fortnite.jpg",
        "trailer": "https://www.youtube.com/embed/Fcl30mWtJQU",
        "description": ""
    },
    "Dota 2": {
        "image": "dota-2.jpg",
        "trailer": "https://www.youtube.com/embed/Ii_EjA7bqYw",
        "description": ""
    },
    "Counter-Strike: Global Offensive": {
        "image": "csgo.jpg",
        "trailer": "https://www.youtube.com/embed/edYCtaNueQY",
        "description": ""
    },
    "PlayerUnknown's Battlegrounds": {
        "image": "pb.jpeg",
        "trailer": "https://www.youtube.com/embed/ODWCbu_cuqk",
        "description": ""
    },
    "Overwatch": {
        "image": "overwatch.jpg",
        "trailer": "https://www.youtube.com/embed/FqnKB22pOC0",
        "description": ""
    },
    "League of Legends": {
        "image": "league-of-legends.jpg",
        "trailer": "https://www.youtube.com/embed/cXZqfuJ9Zps",
        "description": ""
    },
    "Arena of Valor": {
        "image": "arena-of-valor.png",
        "trailer": "https://www.youtube.com/embed/JM_UdSUW1ao",
        "description": ""
    },
    "Call of Duty: Black Ops 4": {
        "image": "black-ops-4.jpg",
        "trailer": "https://www.youtube.com/embed/SyfDsPefQgo",
        "description": ""
    },
    "Rainbow Six Siege": {
        "image": "rainbow-six-siege.jpg",
        "trailer": "https://www.youtube.com/embed/lG9PuYxh_q0",
        "description": ""
    },
    "Hearthstone": {
        "image": "hearthstone.png",
        "trailer": "https://www.youtube.com/embed/8GHv3I9aDM8",
        "description": ""
    },
};
