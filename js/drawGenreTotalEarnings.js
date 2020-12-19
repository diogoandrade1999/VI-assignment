// set the dimensions and margins of the graph
var margin = { top: 20, right: 0, bottom: 30, left: 90 },
    width = 1450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// create svg
var svg = d3.select("#chart-year-earning")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const drawGenreTotalEarnings = (minMaxReleaseDate, groupGenreTotalEarnings, genreList) => {
    // data
    var groupData = {};
    var totalEarningsList = [];
    Object.keys(groupGenreTotalEarnings).forEach(genre => {
        if (genreList.includes(genre)) {
            Object.keys(groupGenreTotalEarnings[genre]).forEach(releaseDate => {
                if (minMaxReleaseDate[0] <= releaseDate && releaseDate <= minMaxReleaseDate[1]) {
                    totalEarningsList.push(groupGenreTotalEarnings[genre][releaseDate]);
                    if (!(releaseDate in groupData)) {
                        groupData[releaseDate] = [];
                    }
                    groupData[releaseDate].push({ "genre": genre, "totalEarnings": groupGenreTotalEarnings[genre][releaseDate] });
                }
            });
        }
    });
    var releaseDates = Object.keys(groupData);

    // clean draw
    svg.selectAll("*").remove();

    // set the ranges
    var x0 = d3.scaleBand()
        .range([0, width])
        .padding(0.5)
        .domain(releaseDates);
    var x1 = d3.scaleBand()
        .domain(Object.keys(groupGenreTotalEarnings))
        .range([0, x0.bandwidth()]);
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, Array.max(totalEarningsList)]);

    var xAxis = d3.axisBottom()
        .scale(x0)
        .tickValues(releaseDates);
    var yAxis = d3.axisLeft().ticks(20, "s")
        .scale(y);

    // add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight', 'bold')
            .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    groupData = d3.entries(groupData);

    var slice = svg.selectAll(".slice")
        .data(groupData)
        .enter()
        .append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + x0(d.key) + ",0)"; });

    slice.selectAll("rect")
        .data(function (d) { return d.value; })
        .enter()
        .append("rect")
            .attr("class", function (d) { return d.genre.replaceAll(" ", ""); })
            .attr("width", x1.bandwidth())
            .attr("x", function (d) { return x1(d.genre); })
            .style("fill", function (d) { return color(d.genre); })
            .attr("y", function (d) { return y(0); })
            .attr("height", function (d) { return height - y(0); })
            .on("mouseover", function (d) {
                d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", d3.rgb(color(d.genre)).darker(2));
            })
            .on("mouseout", function (d) {
                d3.selectAll("." + d.genre.replaceAll(" ", "")).style("fill", color(d.genre));
            });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) { return Math.random() * 1000; })
        .duration(1000)
        .attr("y", function (d) { return y(d.totalEarnings); })
        .attr("height", function (d) { return height - y(d.totalEarnings); });

    //Legend
    var legend = svg.selectAll(".legend")
        .data(genreList)
        .enter()
        .append("g")
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