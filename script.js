

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const condition= document.getElementById("condition");
const conditionimg=document.getElementById("conditionimg");
const temperature=document.getElementById("temperature");
const cardcity=document.getElementById("city");
const humidity=document.getElementById("humidity");
const wind= document.getElementById("wind");
let longitude,latitude;
button.addEventListener("click", fetchWeather);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchWeather();
  }
});


function fetchWeather() {
  const city = input.value.trim();

  if (!city) {
    alert("Please enter a city");
    return;
  }

  console.log("Fetching weather for:", city);


  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0e97b36485838bca2fb99bc50483825e`)
    .then(res => {
        
         if (!res.ok) {
      alert("City not found try another city");
    }
        return res.json()})
    .then(data => {

        // condition.innerHTML=`${data.weather[0].main}`
        // conditionimg.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
   temperature.innerHTML= `${Math.round(data.main.temp - 273.15)}°C`
console.log(data.name);
      cardcity.innerHTML=`${data.name},${data.sys.country}`;
      humidity.innerHTML=`${data.main.humidity}% HUMIDITY`;
      wind.innerHTML=`${data.wind.speed} km/h`;
      longitude=data.coord.lon;
      latitude=data.coord.lat;
        condition.innerHTML = `
  ${data.weather[0].main}
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
`;
        console.log(data.weather.map(weather=>{

        return weather.main;
      }
      ));

// Below code is for setting data in local storage

let searches= JSON.parse(localStorage.getItem("weatherHistory"))||[];

 const weatherData={
 city: data.name,
  country: data.sys.country,
  temperature: `${Math.round(data.main.temp - 273.15)}°C`,
  humidity: `${data.main.humidity}%`,
  wind: `${data.wind.speed} km/h`,
  condition: data.weather[0].main,
  icon: data.weather[0].icon
 };

 searches = searches.filter(
  item => item.city !== data.name
);


searches.push(weatherData);


if (searches.length > 5) {
  searches.shift();
}   

localStorage.setItem(
  "weatherHistory",
  JSON.stringify(searches)
);
console.log(searches);

//calling forcast function to get forcast data of the city for 5 days
forcast();
}).catch(err => {
      console.error("Error:", err);
    });

}


const mainCard = document.getElementById("mainCard");
const historyCard = document.getElementById("historyCard");
const historyBtn = document.getElementById("historyBtn");

let showingHistory = false;

historyBtn.addEventListener("click", () => {

  showingHistory = !showingHistory;

  if (showingHistory) {

    mainCard.style.display = "none";
    renderHistory();
    historyCard.style.display = "flex";

  } else {

    mainCard.style.display = "flex";
    historyCard.style.display = "none";

  }

});


const historyTableBody = document.getElementById("historyTableBody"); // Get the historyTableBody

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  historyTableBody.innerHTML = ""; // Clear existing rows

  history.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.city}, ${item.country}</td>
      <td>${item.temperature}</td>
      <td>${item.condition} <img height="30px" src="https://openweathermap.org/img/wn/${item.icon}@2x.png" /></td>
      <td>${item.humidity}</td>
      <td>${item.wind}</td>
    `;
    historyTableBody.appendChild(row);
  });
}

renderHistory(); 
  

function forcast(){
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=0e97b36485838bca2fb99bc50483825e`)
    .then(res => res.json())
    .then(data => {
      const forecastTableBody = document.getElementById("forcastTableBody");
      forecastTableBody.innerHTML = "";
      data.list.forEach(item => {
        const row = document.createElement("tr");
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        const temperature = Math.round(item.main.temp - 273.15);
        const condition = item.weather[0].main;
        row.innerHTML = `
          <td>${day}, ${date}</td>
          <td>${temperature}°C</td>
          <td>${condition}</td>
        `;
        forecastTableBody.appendChild(row);
      });
      console.log("Forecast data:", data);
    })
    .catch(err => {
      console.error("Error fetching forecast:", err);
    });
}


