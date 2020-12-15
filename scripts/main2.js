$.ajaxSetup({
  async: false,
});

var countries2 = {};

var total_case = 0;

var total_death = 0;

var total_recovered = 0;

function getCountries2() {
  $.getJSON("data/countries.json", function (data, status) {
    if (status == "success") {
      var country_list = data["ref_country_codes"];
      for (var i = 0; i < country_list.length; i++) {
        var element = country_list[i];
        var country = new Country(
          element["alpha2"],
          element["country"],
          element["latitude"],
          element["longitude"],
          0,
          0,
          0
        );
        countries2[element["alpha2"]] = country;
      }
    }
    // Two extra cases
    countries2["XK"] = new Country("XK", "Republic of Kosovo", 42.66, 21.17, 0);
    countries2["SS"] = new Country("SS", "South Sudan", 6.88, 31.31, 0);
  });
}

function getData2() {
  $.get("https://api.covid19api.com/summary", function (data, status) {
    if (status == "success") {
      var country_list = data["Countries"];
      for (var i = 0; i < country_list.length; i++) {
        var element = country_list[i];
        countries2[element["CountryCode"]]["cases"] = element["TotalConfirmed"];
        countries2[element["CountryCode"]]["death"] = element["TotalDeaths"];
        countries2[element["CountryCode"]]["recovered"] =
          element["TotalRecovered"];
      }
      total_case = data["Global"]["TotalConfirmed"];
      total_death = data["Global"]["TotalDeaths"];
      total_recovered = data["Global"]["TotalRecovered"];
    }
  });
}

function main2() {
  getCountries2();
  getData2();
  if ($.isEmptyObject(countries2)) {
    alert("Failed to download data!");
    return;
  }
  visualize2();
}

main2();
