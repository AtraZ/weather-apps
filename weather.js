function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]}, ${hours}:${minutes}`;
}

let realTime = new Date();
let formattedTime = formatDate(realTime);

let timezone = document.querySelector("#my-city-realtime");
timezone.innerHTML = formattedTime;

function cityChange(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#text-search-input");
  let headingName = document.querySelector("#heading-city-name");
  headingName.innerHTML = cityInput.value;
}

let mainForm = document.querySelector("#form-search");
let cityInput = document.querySelector("#text-search-input");

mainForm.addEventListener("submit", cityChange);
function updateElements(response) {
  let updateName = document.querySelector("#heading-city-name");
  updateName.innerHTML = response.data.name;
  let updateTemp = document.querySelector("#Degree-change");
  updateTemp.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  let updateTempsense = document.querySelector("#temp-sensivity");
  updateTempsense.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  let updateprediction = document.querySelector("#prediction");
  updateprediction.innerHTML = response.data.weather[0].description;
  let updatePre = document.querySelector("#precipitation");
  updatePre.innerHTML = `${response.data.clouds.all}%`;
  let updateHumid = document.querySelector("#humidity");
  updateHumid.innerHTML = `${response.data.main.humidity}%`;
  let updateWind = document.querySelector("#wind");
  updateWind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}
function getcityInput(city) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateElements);
}
function handleSubmit(event) {
  event.preventDefault();

  let searchBar = document.querySelector("#text-search-input");
  let city = searchBar.value;
  getcityInput(city);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateElements);
}

function getCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#second-button");
currentButton.addEventListener("click", getCoords);
