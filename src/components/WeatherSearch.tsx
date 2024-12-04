import React, { useState } from "react";

type WeatherSearchProps = {
  onSearch: (city: string) => void;
  onGeoLocation: () => void;
};

const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onSearch,
  onGeoLocation,
}) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>
      <button
        onClick={onGeoLocation}
        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
      >
        Use My Location
      </button>
    </div>
  );
};

export default WeatherSearch;
