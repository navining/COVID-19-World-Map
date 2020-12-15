$.ajaxSetup({
  async: false,
});

var countries = {};

var total_case = 0;

var total_death = 0;

var total_recovered = 0;

function getCountries() {
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

function getData() {
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

let sliderImages = document.querySelectorAll(".slide");
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");
let current = 0;

//clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

//show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

//show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

//Left arrow click
arrowLeft.addEventListener("click", function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

//Right arrow click
arrowRight.addEventListener("click", function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

var prev = window.pageYOffset;
window.onscroll = function () {
  var curr = window.pageYOffset;
  var temp = document.getElementsByClassName("header-main");

  if (prev >= curr) {
    temp[0].style.top = "0";
  } else {
    temp[0].style.top = "-20px";
  }
  prev = curr;
  var introPosT = document.querySelector(".intro").getBoundingClientRect().top;
  var chart1Pos = document.querySelector(".confirmed").getBoundingClientRect()
    .bottom;
  var chart2Pos = document.querySelector(".recovered").getBoundingClientRect()
    .bottom;
  var chart3Pos = document.querySelector(".dead").getBoundingClientRect()
    .bottom;

  if (introPosT < curr && curr < chart1Pos) {
    document.querySelector(".intro-a").style.color = "orangered";
  } else {
    document.querySelector(".intro-a").style.color = "white";
  }

  if (chart1Pos < curr && curr < chart2Pos) {
    document.querySelector(".confirmed-a").style.color = "orangered";
  } else {
    document.querySelector(".confirmed-a").style.color = "white";
  }

  if (chart2Pos < curr && curr < chart3Pos) {
    document.querySelector(".recovered-a").style.color = "orangered";
  } else {
    document.querySelector(".recovered-a").style.color = "white";
  }

  if (chart3Pos < curr) {
    document.querySelector(".dead-a").style.color = "orangered";
  } else {
    document.querySelector(".dead-a").style.color = "white";
  }
};

function main() {
  startSlide();
  getCountries();
  getData();
  if ($.isEmptyObject(countries)) {
    alert("Failed to download data!");
    return;
  }
  visualize();
}

main();
