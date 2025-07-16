const apiKey = "cd952c5e9a4cbf2d08008c6c0d510660";
const cityName = document.querySelector("input");
const searchButton = document.querySelector(".search-button img");
const weatherStatus = document.querySelector(".weather img");


//TODO: Switcher °C and °F button
async function consultWeather(city) {
  try {
    function ClearInput() {
      cityName.value = "";
      cityName.placeholder = "Type for a city...";
      cityName.classList.remove("shake");
      searchButton.classList.remove("shake");
    }
    ClearInput();

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );

    const data = await response.json();

    console.log(data);
    const { name, main, wind, weather } = data;
    const updateStatus = () => {

      document.querySelector(".temp").innerText = `${Number(main.temp).toFixed(0)}°C`;
      document.querySelector(".city").innerText = name;
      document.querySelector(".humidity").innerText = `${main.humidity}%`;
      document.querySelector(".wind").innerText = `${Number(wind.speed).toFixed(1)}km/h`;

      weather[0].main == "Clouds"
        ? (weatherStatus.src = "./assets/clouds.png")
        : weather[0].main == "Clear"
        ? (weatherStatus.src = "./assets/clear.png")
        : weather[0].main == "Drizzle"
        ? (weatherStatus.src = "./assets/drizzle.png")
        : weather[0].main == "Mist"
        ? (weatherStatus.src = "./assets/mist.png")
        : weather[0].main == "Rain"
        ? (weatherStatus.src = "./assets/rain.png")
        : weather[0].main == "Snow"
        ? (weatherStatus.src = "./assets/snow.png")
        : (weatherStatus.src = "./assets/clear.png");
    };
    await updateStatus();
  } catch (error) {
    cityName.value = "";
    cityName.classList.add("shake");
    searchButton.classList.add("shake");
    cityName.placeholder = "Invalid City Name...";
  }
}

document.addEventListener("keydown", (event) => {
  event.key === "Enter" ? consultWeather(`${cityName.value}`) : ""
})

searchButton.onclick = () => {
  consultWeather(`${cityName.value}`);
};

