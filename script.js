let weather = {
    apiKey: "ff8aaf45aacf4db152248dac4707a06a", // Replace with your actual API key
  
    fetchWeather: function (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
  
      console.log("Fetching weather for:", city);
      console.log("API URL:", url);
  
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`City not found (${response.status})`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Weather Data:", data);
          this.displayWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          alert("Error: City not found. Please check the city name.");
        });
    },
  
    displayWeather: function (data) {
      if (!data || !data.weather || !data.main || !data.wind) {
        alert("Invalid weather data received.");
        return;
      }
  
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = `${temp}°C`;
      document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
      document.querySelector(".weather").classList.remove("loading");
  
      // Fetch background image from Unsplash
      const unsplashURL = `https://source.unsplash.com/1600x900/?weather,${name}`;
      fetch(unsplashURL)
        .then((response) => {
          if (response.ok) {
            document.body.style.backgroundImage = `url('${unsplashURL}')`;
          } else {
            document.body.style.backgroundImage = `url('https://img.freepik.com/premium-photo/blue-sky-with-white-clouds_87394-38736.jpg')`;
          }
        });
    },
  
    search: function () {
      const city = document.querySelector(".search-bar").value.trim();
      if (city === "") {
        alert("Please enter a city name.");
        return;
      }
      this.fetchWeather(city);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
  