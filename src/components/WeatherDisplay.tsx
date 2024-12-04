import React from "react";

type WeatherDisplayProps = {
  data: any; // Позже заменим на точный тип
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  if (!data) {
    return <div>Search for a city to see the weather!</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <p>Temperature: {data.main.temp}°C</p>
    </div>
  );
};

export default WeatherDisplay;
