import React, { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import { getWeatherByCity } from "./services/weatherService";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (city: string) => {
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <WeatherSearch onSearch={handleSearch} />
      <WeatherDisplay data={weatherData} />
    </div>
  );
};

export default App;
