function drawMap(data) {
    var width = 1400
    var height = 680

    svg = d3.select(".content")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    g = svg.append('g')
        .attr('class', 'map')

    var projection = d3.geoMercator()
        .scale(150)
        .translate( [700, 470]);

    var path = d3.geoPath()
        .projection(projection)

    g.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .style('fill', '#b3cccc')
        .style('stroke', 'black')
        .style('stroke-width', 0.4)
        .attr("d", path)

    const zoom = d3.zoom()
        .scaleExtent([1, 40])
        .on("zoom", (event) => {
            g.attr("transform", event.transform)
        })

    svg.call(zoom)

    svg.call(
        zoom.transform,
        d3.zoomIdentity.translate(0,0)
    )

}

function drawCircles() {

}

function visualize() {
    $.getJSON("data/world_countries.json", drawMap)
    drawCircles()
}