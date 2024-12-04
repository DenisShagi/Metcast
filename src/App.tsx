import React, { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import {
  getWeatherByCity,
  getFiveDayForecast,
  getWeatherByGeo,
} from "./services/weatherService";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [language, setLanguage] = useState("en"); // Язык по умолчанию — английский

  // Обработчик поиска по городу
  const handleSearch = async (city: string) => {
    try {
      const currentWeather = await getWeatherByCity(city, language);
      const forecast = await getFiveDayForecast(city, language);

      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Обработчик геолокации
  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const { currentWeather, forecast } = await getWeatherByGeo(
            latitude,
            longitude
          );

          setWeatherData(currentWeather);
          setForecastData(forecast);
        } catch (error) {
          console.error("Error fetching weather data by geolocation:", error);
          setWeatherData(null);
          setForecastData(null);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert(
          "Unable to retrieve your location. Please check your browser settings."
        );
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Weather Forecast</h1>
          {/* Выбор языка */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-black p-2 rounded-lg"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div className="mt-6 max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-black">
          <WeatherSearch
            onSearch={handleSearch}
            onGeoLocation={handleGeoLocation}
          />
        </div>
        <div className="mt-6">
          <WeatherDisplay data={weatherData} forecast={forecastData} />
        </div>
      </div>
    </div>
  );
};

export default App;
