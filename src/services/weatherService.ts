import axios from "axios";

const API_KEY = "your_openweather_api_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric", // Для получения температуры в градусах Цельсия
    },
  });
  return response.data;
};
