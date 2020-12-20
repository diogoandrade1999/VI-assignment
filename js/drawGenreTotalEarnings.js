// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 30, left: 60 },
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// create svg
var svg = d3.select("#chart-year-earning")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + (margin.left + 10) + "," + margin.top + ")");

var legendSvg = d3.select("#chart-year-earning")
    .append("svg")
    .attr("width", 250)
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
    
    var releaseDates = [];
    var genres = ["Strategy", "First-Person Shooter", "Multiplayer Online Battle Arena", "Role-Playing Game", "Racing",
            "Fighting Game", "Sports", "Collectible Card Game", "Puzzle Game", "Battle Royale", "Third-Person Shooter"];
    var cutoff = 10000;

    releaseDates.sort();
    // console.log(groupData);

    // clean draw
    svg.selectAll("*").remove();
    legendSvg.selectAll("*").remove();

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.genre;})
        .entries(filteredData);

    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .tickValues(yearList)
            .ticks(yearList.length)
    }
    
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(filteredData, function(d) { return d.year; }))
        .range([ 0, width ]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisWhite")
        .call(d3.axisBottom(x).tickValues(yearList).ticks(yearList.length).tickFormat(d3.format("d")));

    // add the X gridlines
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisWhite")
        .style("opacity", "0.2")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    // Add Y axis
    var y = d3.scaleSymlog()
        .domain([cutoff, d3.max(filteredData, function(d) { return +d.earnings; })])
        .range([ height, 0 ]);
    svg.append("g")
        .attr("class", "axisWhite")
        .call(d3.axisLeft(y).tickValues([10000, 100000, 100000, 1000000, 10000000, 100000000]));

    // color palette
    var res = sumstat.map(function(d){ return d.name }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    // Draw the line
    svg.append("g")
        .selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function (d) {
                if (d.earnings < cutoff){
                    return y(cutoff);
                }else{
                 return y(+d.earnings);
                } 
                })
            (d.values)
        })

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(filteredData)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.year); } )
            .attr("cy", function (d) {
                if (d.earnings < cutoff){
                    return y(cutoff);
                }else{
                 return y(d.earnings);
                } 
                } )
            .attr("r", 3)
            .attr("stroke", "black")
            .attr("stroke-width", 0.7   )
            .style("fill", function(d){ return color(d.genre) })


    //Legend
    var legend = legendSvg.selectAll(".legend")
        .data(genres)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 25 + ")"; })
        .style("opacity", "0");

    legend.append("rect")
        .attr("class", function (d) { return d.replaceAll(" ", ""); })
        .attr("x", 165)
        .attr("width", 18)
        .attr("height", 18)
        .attr("stroke", "black")
        .attr("stroke-width", 0.8   )
        .style("fill", function (d) { return color(d); })
        .on("mouseover", function (d) {
            d3.selectAll("." + d.replaceAll(" ", "")).style("fill", d3.rgb(color(d)).darker(2));
        })
        .on("mouseout", function (d) {
            d3.selectAll("." + d.replaceAll(" ", "")).style("fill", color(d));
        });

    legend.append("text")
        .attr("x",155)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("font-size", "14px")
        .style("text-anchor", "end")
        .text(function (d) { return d; });

    legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");


}