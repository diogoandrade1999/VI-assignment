// set the dimensions and margins of the graph
var margin2 = { top: 20, right: 0, bottom: 30, left: 280 },
    width2 = 1240 - margin.left - margin.right,
    height2 = 400 - margin2.top - margin2.bottom;

// create svg
var svg2 = d3.select("#chart-game-earning")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");


const drawGameTotalEarnings = (minMaxReleaseDate, groupGameTotalEarnings) => {
    // data
    var groupData = [];
    Object.keys(groupGameTotalEarnings).forEach(releaseDate => {
        if (minMaxReleaseDate[0] <= releaseDate && releaseDate <= minMaxReleaseDate[1]) {
            groupGameTotalEarnings[releaseDate].forEach(data => {
                groupData.push(data);
            });
        }
    });
    groupData.sort((a, b) => (a.earnings > b.earnings) ? 1 : ((b.earnings > a.earnings) ? -1 : 0));
    //console.log(groupData)
    groupData = groupData.slice(groupData.length - 10);
    

    // clean draw
    svg2.selectAll("*").remove();

    // set the ranges
    var x2 = d3.scaleLinear()
        .range([0, width2])
        .domain([0, d3.max(groupData, function (d) {
            return d.totalEarnings;
        })]);

    var y2 = d3.scaleBand()
        .range([height2, 0])
        .padding(0.1)
        .domain(groupData.map(function (d) {
            return d.game;
        }));

    // append the rectangles for the bar chart
    svg2.selectAll(".bar")
        .data(groupData)
        .enter().append("rect")
        .attr("class", function (d) { return "bar " + d.genre.replaceAll(" ", ""); })
        .style("fill", function (d) { return color(d.genre); })
        .attr("width", function (d) { return x2(d.totalEarnings); })
        .attr("y", function (d) { return y2(d.game); })
        .attr("height", y2.bandwidth())
        .on("mouseover", function (d) {
            d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre)).darker(2));
        })
        .on("mouseout", function (d) {
            d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", color(d.genre));
        });

    // add the x Axis
    svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x2));

    // add the y Axis
    svg2.append("g")
        .call(d3.axisLeft(y2));
}