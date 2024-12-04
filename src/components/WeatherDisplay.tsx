import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from 'chart.js';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

// Регистрация компонентов для Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type WeatherDisplayProps = {
  data: any;
  forecast: any;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, forecast }) => {
  if (!data) {
    return (
      <div className="text-center text-gray-300">
        Search for a city to see the weather!
      </div>
    );
  }

  // Генерация данных для графика
  const generateChartData = (): ChartData<"line"> | null => {
    if (!forecast) return null;

    const labels = forecast.list.slice(0, 8).map((item: any) =>
      new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const temperatures = forecast.list
      .slice(0, 8)
      .map((item: any) => item.main.temp);

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const chartData = generateChartData();
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Это значение теперь явно типизировано
      },
      title: {
        display: true,
        text: "Temperature Forecast (Next 24 Hours)",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  const currentWeatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-black max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
      <div className="flex items-center gap-4">
        <img src={currentWeatherIconUrl} alt={data.weather[0].description} />
        <div>
          <p className="text-lg capitalize">{data.weather[0].description}</p>
          <p className="text-lg">Temperature: {data.main.temp}°C</p>
        </div>
      </div>
      <p className="text-lg mt-4">Humidity: {data.main.humidity}%</p>
      <p className="text-lg">Wind Speed: {data.wind.speed} m/s</p>
      <p className="text-lg">Pressure: {data.main.pressure} hPa</p>
      <p className="text-lg">
        Visibility: {data.visibility / 1000 || "N/A"} km
      </p>

      <h3 className="text-xl font-bold mt-6 mb-2">Temperature Chart</h3>
      {chartData ? (
        <div className="mb-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-gray-500">No forecast data available.</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
