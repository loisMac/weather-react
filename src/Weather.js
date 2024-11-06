import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");

  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setCity(event.target[0].value);
  }

  function showWeatherData(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(Math.round(response.data.main.humidity));
    setWind(Math.round(response.data.wind.speed));
  }

  if (!city) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input type="search" placeholder="Enter a City" autoFocus="on" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  } else {
    let apiKey = "ce144f0cf51fa43f03431f0488a36728";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeatherData);
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input type="search" placeholder="Enter a City" autoFocus="on" />
          <input type="submit" value="Search" />
        </form>
        <h3>Currently in {city}:</h3>
        <li>Temperature: {temperature}°C</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {wind} meter/sec</li>
      </div>
    );
  }
}
