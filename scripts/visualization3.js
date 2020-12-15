function drawMap3(data) {
  var width = 1400;
  var height = 680;

  svg = d3
    .select(".dead-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  map = svg.append("g").attr("class", "map");

  projection = d3.geoMercator().scale(250).translate([700, 470]);

  path = d3.geoPath().projection(projection);

  map
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .style("fill", "#E0E7F0")
    .style("stroke", "black")
    .style("stroke-width", 0.4)
    .attr("d", path);
}

function drawCircles3() {
  circles = svg.append("g").attr("class", "circles");

  for (var id in countries) {
    var country = countries[id];
    if (country.death == 0) continue;
    var lat, lon;
    circles
      .append("circle")
      .attr("id", country.id)
      .attr("cx", function () {
        lon = projection([country.lon])[0];
        return lon;
      })
      .attr("cy", function () {
        lat = -1.065 * projection([country.lat])[0] + 1215;
        return lat;
      })
      .attr("r", function () {
        return 3 + country.death / 400000;
      })
      .attr("fill", "red")
      .attr("stroke", "black")
      .attr("opacity", 0.5)
      .attr("class", "circle")
      .on("mouseover", function () {
        d3.select(this).attr("class", "circle hover");
        var countryid = d3.select(this).attr("id");
        d3.select("#" + countryid + "-text").attr("style", "display: inline;");
      })
      .on("mouseout", function () {
        d3.select(this).attr("class", "circle");
        var countryid = d3.select(this).attr("id");
        d3.select("#" + countryid + "-text").attr("style", "display: none;");
      });

    circles
      .append("text")
      .attr("id", country.id + "-text")
      .text(country.name + ": " + country.death)
      .attr("x", lon + 20)
      .attr("y", lat - 20)
      .attr("style", "display:none;");
  }
}

function drawText3() {
  text = svg.append("g");
  text
    .append("text")
    .attr("class", "text")
    .text(function () {
      return "Total Cases: " + total_case;
    })
    .attr("x", 50)
    .attr("y", 50);
  text
    .append("text")
    .attr("class", "text")
    .text(function () {
      return "Total Deaths: " + total_death;
    })
    .attr("x", 50)
    .attr("y", 80);
  text
    .append("text")
    .attr("class", "text")
    .text(function () {
      return "Total Recovered: " + total_recovered;
    })
    .attr("x", 50)
    .attr("y", 110);
}

function setUpZoom3() {
  const zoom = d3
    .zoom()
    .scaleExtent([0.8, 40])
    .on("zoom", (event) => {
      map.attr("transform", event.transform);
      circles.attr("transform", event.transform);
    });

  svg.call(zoom);

  svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0));
}

function visualize3() {
  $.getJSON("data/world_countries.json", drawMap3);
  drawText3();
  drawCircles3();
  setUpZoom3();
}
