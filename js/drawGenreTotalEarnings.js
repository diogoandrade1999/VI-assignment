// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 30, left: 60 },
    width = 1450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// create svg
var svg = d3.select("#chart-year-earning")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


const drawGenreTotalEarnings = (minMaxReleaseDate, yearList, data) => {
    // data

    var filteredData = data.reduce((filteredData, d) => {
        if(minMaxReleaseDate[0] <= d.year && d.year <= minMaxReleaseDate[1]){
            filteredData.push(d);
        }
        return filteredData;
    }, []);

    //console.log(filteredData);
    
    var totalEarningsList = [];
    var releaseDates = [];
    var genres = ["Strategy", "First-Person Shooter", "Multiplayer Online Battle Arena", "Role-Playing Game", "Racing",
            "Fighting Game", "Sports", "Collectible Card Game", "Puzzle Game", "Battle Royale", "Third-Person Shooter"];

    releaseDates.sort();
    // console.log(groupData);

    // clean draw
    svg.selectAll("*").remove();

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.genre;})
        .entries(filteredData);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(filteredData, function(d) { return d.year; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(yearList.length).tickFormat(d3.format("d")));

    // Add Y axis
    var y = d3.scaleSymlog()
        .domain([0, d3.max(filteredData, function(d) { return +d.earnings; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function(d){ return d.name }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.earnings); })
            (d.values)
        })

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(filteredData)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.year); } )
            .attr("cy", function (d) { return y(d.earnings); } )
            .attr("r", 2)
            .style("fill", function(d){ return color(d.genre) })

    //Legend
    var legend = svg.selectAll(".legend")
        .data(genres)
        .enter().append("g")
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