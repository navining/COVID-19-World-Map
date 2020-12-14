var countries = {}

function getCountries() {
    $.getJSON("data/countries.json", function(data, status) {
        if (status == "success") {
            var country_list = data["ref_country_codes"]
            for (var i = 0; i < country_list.length; i++) {
                var element = country_list[i]
                var country = new Country(element["alpha2"], element["country"], element["latitude"], element["longitude"], 0)
                countries[element["alpha2"]] = country
            }
        }
        // Two extra cases
        countries["XK"] = new Country("XK", "Republic of Kosovo", 42.66, 21.17, 0)
        countries["SS"] = new Country("SS", "South Sudan", 6.88, 31.31, 0)
    })
}

function getData() {
    $.get("https://api.covid19api.com/summary", function(data, status) {
        if (status == "success") {
            var country_list = data["Countries"]
            for (var i = 0; i < country_list.length; i++) {
                var element = country_list[i]
                countries[element["CountryCode"]]["cases"] = element["TotalConfirmed"]
            }
        }
    })
}

function main() {
    getCountries()
    getData()
}

main()