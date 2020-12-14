function drawMap(data) {
    var width = 1400
    var height = 680

    svg = d3.select(".content")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    map = svg.append('g')
        .attr('class', 'map')

    projection = d3.geoMercator()
        .scale(150)
        .translate([700, 470]);

    path = d3.geoPath()
        .projection(projection)

    map.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .style('fill', '#b3cccc')
        .style('stroke', 'black')
        .style('stroke-width', 0.4)
        .attr("d", path)


}

function drawCircles() {
    circles = svg.append('g')
        .attr('class', 'circles')

    for (var id in countries) {
        var country = countries[id]
        circles.append("circle")
            .attr("cx", function() {
                return projection([country.lon])[0]
            })
            .attr("cy", function() {
                return -1.065 * projection([country.lat])[0] + 1215
            })
            .attr("r", function() {
                return 2 + country.cases/500000
            })
            .attr("fill", "red")
            .attr("opacity", 0.4)
    }
}

function setUpZoom() {
    const zoom = d3.zoom()
        .scaleExtent([1, 40])
        .on("zoom", (event) => {
            map.attr("transform", event.transform)
            circles.attr("transform", event.transform)
        })

    svg.call(zoom)

    svg.call(
        zoom.transform,
        d3.zoomIdentity.translate(0,0)
    )
}

function visualize() {
    $.getJSON("data/world_countries.json", drawMap)
    drawCircles()
    setUpZoom()
}