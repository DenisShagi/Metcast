import React, { useState } from "react";

type WeatherSearchProps = {
  onSearch: (city: string) => void;
};

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default WeatherSearch;
