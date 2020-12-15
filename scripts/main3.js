$.ajaxSetup({
  async: false,
});

var countries = {};

var total_case = 0;

var total_death = 0;

var total_recovered = 0;

function getCountries3() {
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
        countries[element["alpha2"]] = country;
      }
    }
    // Two extra cases
    countries["XK"] = new Country("XK", "Republic of Kosovo", 42.66, 21.17, 0);
    countries["SS"] = new Country("SS", "South Sudan", 6.88, 31.31, 0);
  });
}

function getData3() {
  $.get("https://api.covid19api.com/summary", function (data, status) {
    if (status == "success") {
      var country_list = data["Countries"];
      for (var i = 0; i < country_list.length; i++) {
        var element = country_list[i];
        countries[element["CountryCode"]]["cases"] = element["TotalConfirmed"];
        countries[element["CountryCode"]]["death"] = element["TotalDeaths"];
        countries[element["CountryCode"]]["recovered"] =
          element["TotalRecovered"];
      }
      total_case = data["Global"]["TotalConfirmed"];
      total_death = data["Global"]["TotalDeaths"];
      total_recovered = data["Global"]["TotalRecovered"];
    }
  });
}

function main3() {
  getCountries3();
  getData3();
  if ($.isEmptyObject(countries)) {
    alert("Failed to download data!");
    return;
  }
  visualize3();
}

main3();
