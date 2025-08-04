document.addEventListener("DOMContentLoaded", () => {
  const cityNameDisplay = document.querySelector(".city");
  const cityInput = document.querySelector(".search-box");
  const descriptionDisplay = document.querySelector(".weather");
  const tempDisplay = document.querySelector(".temp");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "1c91f2f0eaf694307a7f6ca807bb0c23";
  const currentDisplay = document.querySelector(".current");
  cityInput.addEventListener("keypress", async (e) => {
    if (e.keyCode == 13) {
      const city = cityInput.value.trim();

      if (!city) return;
      //it may throw error
      //server/database is always in another place

      try {
        const wheatherData = await fetchWheatherData(city);
        displayData(wheatherData, city);
      } catch (error) {
        displayError();
      }
    }
  });

  async function fetchWheatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url); //using await because fetch returns promise
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    return data;
  }

  function displayData(wheatherData, city) {
    errorMessage.classList.add("hidden");
    currentDisplay.classList.remove("hidden");
    city = city.slice(0, 1).toUpperCase() + city.slice(1).toLowerCase();
    cityNameDisplay.innerHTML = `${city}`;

    tempDisplay.innerHTML = `<span>${Math.round(
      wheatherData.main.temp
    )}°c</span>`;

    descriptionDisplay.innerHTML = `${wheatherData.weather[0].description}`;
  }

  function displayError() {
    currentDisplay.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
