const color = d3.scaleOrdinal(d3.schemePaired);

// Parse the date
const parseTime = d3.timeParse("%Y");

// set the dimensions and margins of the graph
var margin1 = { top: 30, right: 30, bottom: 60, left: 90 },
    width1 = 1240 - margin1.left - margin1.right,
    height1 = 460 - margin1.top - margin1.bottom;

// create svg
var svg1 = d3.select("#chart-year-earning")
    .append("svg")
        .attr("width", width1 + margin1.left + margin1.right)
        .attr("height", height1 + margin1.top + margin1.bottom)
        .append("g")
            .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var legendSvg1 = d3.select("#chart-year-earning")
    .append("svg")
        .attr("width", 290)
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
    .outerRadius(radius * 0.8);

var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

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
        "description": "Call of Duty: Modern Warfare is a multiplayer first person shooter developed by Infinity Ward. It was published by Activision on October 25, 2019 for Microsoft Windows, PlayStation 4 and Xbox One. It is the sixteenth game in the Call of Duty series and acts as a ‘soft reboot’ of the Modern Warfare sub series."
    },
    "Apex Legends": {
        "image": "apex-legends.png",
        "trailer": "https://www.youtube.com/embed/UMJb_mkqynU",
        "description": "Apex Legends is a battle royale videogame developed by Respawn Entertainment and published by Electronic Arts. Situated in the same universe as the Titanfall series, the game was revealed and launched after a surprise announcement on February, 4 2019 for Microsoft Windows, Xbox One and Playstation 4."
    },
    "Gears 5": {
        "image": "gears-5.jpg",
        "trailer": "https://www.youtube.com/embed/SEpWlFfpEkU",
        "description": "Gears 5 is a third person shooter developed by The Coalition and published by Xbox Game Studios. It was released on September 6, 2019 for Xbox One and Windows 10 as part of Xbox Play Anywhere. It is the sixth title in the Gears of War series and the follow-up to Gears of War 4."
    },
    "FIFA 20": {
        "image": "fifa20.png",
        "trailer": "https://www.youtube.com/embed/vgQNOIhRsV4",
        "description": "FIFA 20 is a football simulation video game published by Electronic Arts as part of the FIFA series. It is the 27th installment in the FIFA series, and was released on 27 September 2019 for Microsoft Windows, PlayStation 4, Xbox One, and Nintendo Switch. It is the 4th installment of the series to use the Frostbite engine on Xbox One, PS4 and PC."
    },
    "Auto Chess": {
        "image": "auto-chess.jpg",
        "trailer": "https://www.youtube.com/embed/XZoGA7_vtLw",
        "description": "Dota Auto Chess is a strategy video game mod for the video game Dota 2. Developed by Drodo Studio and released in January 2019, the game features elements of chess and supports up to eight players. The popularity of the mod, with it having over eight million players by May 2019, led to the creation of the auto battler genre that had a number of other games being released. Later in 2019, Drodo Studio developed a standalone version known simply as Auto Chess, while Valve, the developer of Dota 2, developed their own standalone version known as Dota Underlords."
    },
    "Teamfight Tactics": {
        "image": "teamfight-tactics.png",
        "trailer": "https://www.youtube.com/embed/liNLLx874g4",
        "description": "Teamfight Tactics (abbreviated as TFT) is a free-to-play strategy and auto-chess videogame developed and published by Riot Games. It is situated in the League of Legends universe and is based on Dota’s Auto Chess where players compete against another 7 opponents, each building a squad in an attempt to be the last one standing."
    },
    "F1 2019": {
        "image": "f1-2019.jpg",
        "trailer": "https://www.youtube.com/embed/zj1lVY8wrqk",
        "description": "F1 2019 is the official video game of the 2019 Formula One and Formula 2 Championships developed and published by Codemasters. It is the twelfth title in the Formula One series developed by the studio. The video game is the eleventh installment of the franchise, and it features all twenty-one circuits, twenty drivers and ten teams present in the 2019 Formula One World Championship. Codemasters has stated that the game was in development for nearly two years and described it as \"the most ambitious release in franchise history\"."
    },
    "TEPPEN": {
        "image": "teppen.jpg",
        "trailer": "https://www.youtube.com/embed/cMxm0QvfjQM",
        "description": "Teppen (stylized as TEPPEN) is a free-to-play digital collectible card game developed by GungHo Online Entertainment and Capcom. It released in North America and Europe on July 4, 2019 and in Asia on August 08 for Android, and iOS. The game was initially known as Project Battle and is a crossover video game between multiple Capcom franchises."
    },
    "Mortal Kombat 11": {
        "image": "mortal-kombat11.jpg",
        "trailer": "https://www.youtube.com/embed/7zwQPJmg-Kg",
        "description": "Mortal Kombat 11 is a fighting game developed by NetherRealm Studios and published by Warner Bros. Interactive Entertainment. Running on a heavily modified version of Unreal Engine 3, it is the eleventh main installment in the Mortal Kombat series and a sequel to 2015's Mortal Kombat X. Announced at The Game Awards 2018, the game was released in North America and Europe on April 23, 2019 for Microsoft Windows, Nintendo Switch, PlayStation 4 and Xbox One."
    },
    "Pro Evolution Soccer 2019": {
        "image": "pes2019.png",
        "trailer": "https://www.youtube.com/embed/7fgZD42pGDo",
        "description": "Pro Evolution Soccer 2019 (abbreviated as PES 2019) is a football simulation video game developed by PES Productions and published by Konami for Microsoft Windows, PlayStation 4, and Xbox One. The game was the 18th installment in the PES series and was released on 28 August 2018, in North America and on 30 August 2018, in Japan, Europe, and Australia."
    },
    "Fortnite": {
        "image": "fortnite.jpg",
        "trailer": "https://www.youtube.com/embed/Fcl30mWtJQU",
        "description": "Fortnite is a third-person online battle-royale action game, developed by Epic Games. The game was released for Microsoft Windows, macOS, PlayStation 4 and Xbox One on July 25, 2017. The main distinction from other games in the genre is the game's construction elements, letting players build walls, obstacles, and other structures from collected resources to take cover from incoming fire or get a strategic advantage."
    },
    "Dota 2": {
        "image": "dota-2.jpg",
        "trailer": "https://www.youtube.com/embed/Ii_EjA7bqYw",
        "description": "Dota 2 is a multiplayer online battle arena (MOBA) video game developed and published by Valve. The game is a sequel to Defense of the Ancients (DotA), which was a community-created mod for Blizzard's Warcraft III. It was released for Microsoft Windows, OS X, and Linux through Steam in July 2013. Dota 2 has a large esports scene, with teams from around the world playing in various professional leagues and tournaments."
    },
    "Counter-Strike: Global Offensive": {
        "image": "csgo.jpg",
        "trailer": "https://www.youtube.com/embed/edYCtaNueQY",
        "description": "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter video game developed by Valve and Hidden Path Entertainment. It is the fourth game in the Counter-Strike series and was released for Windows, macOS, Xbox 360, and PlayStation 3 in August 2012. The professional scene consists of tournaments hosted by third-party organisations and Valve-organised or co-sponsored tournaments, referred to as Majors which have prize pools originally set at $250,000 but recently rising to as high as $1,000,000."
    },
    "PlayerUnknown's Battlegrounds": {
        "image": "pb.jpeg",
        "trailer": "https://www.youtube.com/embed/ODWCbu_cuqk",
        "description": "PlayerUnknown's Battlegrounds (PUBG) is an online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole. The game is based on previous mods that were created by Brendan \"PlayerUnknown\" Greene for other games, inspired by the 2000 Japanese film Battle Royale. Battlegrounds was first released for Microsoft Windows via Steam's early access beta program in March 2017, with a full release in December 2017."
    },
    "Overwatch": {
        "image": "overwatch.jpg",
        "trailer": "https://www.youtube.com/embed/FqnKB22pOC0",
        "description": "Overwatch is a team-based multiplayer first-person shooter developed and published by Blizzard Entertainment. Described as a \"hero shooter\", Overwatch assigns players into two teams of six, with each player selecting from a roster of over 30 characters, known as \"heroes\", each with a unique style of play. Players on a team work together to secure and defend control points on a map or escort a payload across the map in a limited amount of time. It was released for PlayStation 4, Xbox One, and Windows in May 2016, and Nintendo Switch in October 2019."
    },
    "League of Legends": {
        "image": "league-of-legends.jpg",
        "trailer": "https://www.youtube.com/embed/cXZqfuJ9Zps",
        "description": "League of Legends (abbreviated LoL or League) is a 2009 multiplayer online battle arena video game developed and published by Riot Games for Microsoft Windows and macOS. Originally inspired by Defense of the Ancients (DotA), the game was released on October 27, 2009. League of Legends is often cited as the world's largest esport, with an international competitive scene. The 2019 League of Legends World Championship had over 100 million unique viewers, peaking at a concurrent viewership of 44 million, with a minimum prize pool of US$2.5 million."
    },
    "Arena of Valor": {
        "image": "arena-of-valor.png",
        "trailer": "https://www.youtube.com/embed/JM_UdSUW1ao",
        "description": "Arena of Valor, formerly Realm of Valor then Strike of Kings, is an international adaptation of Honor of Kings, a multiplayer online battle arena (MOBA) developed by TiMi Studios and published by Tencent Games for Android, iOS and Nintendo Switch for markets outside mainland China. As of September 2018, the game has grossed over $140 million outside China. Arena of Valor was one of six Esports video games featured at the 2018 Asian Games, 2019 Southeast Asian Games, 2021 Asian Indoor and Martial Arts Games."
    },
    "Call of Duty: Black Ops 4": {
        "image": "black-ops-4.jpg",
        "trailer": "https://www.youtube.com/embed/SyfDsPefQgo",
        "description": "Call of Duty: Black Ops 4 is a multiplayer first-person shooter developed by Treyarch and published by Activision. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on October 12, 2018. It is a sequel to the 2015 game Call of Duty: Black Ops III, the fifth entry in the Black Ops sub-series, and the 15th installment in the Call of Duty series overall."
    },
    "Rainbow Six Siege": {
        "image": "rainbow-six-siege.jpg",
        "trailer": "https://www.youtube.com/embed/lG9PuYxh_q0",
        "description": "Tom Clancy's Rainbow Six Siege is an online tactical shooter video game developed by Ubisoft Montreal and published by Ubisoft. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on December 1, 2015. The game puts heavy emphasis on environmental destruction and cooperation between players. Each player assumes control of an attacker or a defender in different gameplay modes such as rescuing a hostage, defusing a bomb, and taking control of an objective within a room. The company partnered with ESL to make Siege an esports game. In February 2019, the game surpassed 45 million registered players across all platforms."
    },
    "Hearthstone": {
        "image": "hearthstone.png",
        "trailer": "https://www.youtube.com/embed/8GHv3I9aDM8",
        "description": "Hearthstone is a free-to-play online digital collectible card game developed and published by Blizzard Entertainment. Originally subtitled Heroes of Warcraft, Hearthstone builds upon the existing lore of the Warcraft series by using the same elements, characters, and relics. It was first released for Microsoft Windows and macOS in March 2014, with ports for iOS and Android releasing later that year. The game features cross-platform play, allowing players on any supported device to compete with one another, restricted only by geographical region account limits. As of November 2018, Blizzard has reported more than 100 million Hearthstone players. The game has become popular as an esport, with cash prize tournaments hosted by Blizzard and other organizers."
    }
};
