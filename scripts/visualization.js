function drawMap(data) {
    console.log(data)
    var width = 1400
    var height = 680

    var svg = d3.select(".content")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');

    var projection = d3.geoMercator()
        .scale(150)
        .translate( [700, 470]);

    var path = d3.geoPath()
        .projection(projection)

    var map = svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .style('fill', '#b3cccc')
        .style('stroke', 'black')
        .style('stroke-width', 0.4)
        .attr("d", path)
}


function visualize() {
    $.getJSON("data/world_countries.json", drawMap)
}