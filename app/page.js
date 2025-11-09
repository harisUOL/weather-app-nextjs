"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async (e) => {
  e.preventDefault();
  if (!city) return;

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Full API response:", data);
    setWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

function getBackground(condition) {
  switch (condition?.toLowerCase()) {
    case "clear":
      return "from-blue-400 to-yellow-300"; // sunny
    case "clouds":
      return "from-gray-400 to-gray-700"; // cloudy
    case "rain":
      return "from-blue-700 to-gray-800"; // rainy
    case "drizzle":
      return "from-cyan-400 to-blue-700"; // light rain
    case "thunderstorm":
      return "from-gray-800 to-purple-900"; // thunder
    case "snow":
      return "from-blue-200 to-white"; // snowy
    case "mist":
    case "fog":
      return "from-gray-300 to-gray-500"; // foggy
    default:
      return "from-blue-400 to-blue-700"; // default
  }
}
  return (
<main
  className={`flex flex-col items-center justify-center min-h-screen p-6 text-white bg-linear-to-br transition-all duration-500 ${
    getBackground(weather?.weather?.[0]?.main)
  }`}
>      <h1 className="text-4xl font-bold mb-6">Weather App 🌦️</h1>
      <form onSubmit={getWeather} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <button className="bg-yellow-400 text-black px-4 py-2 rounded">
          Search
        </button>
      </form>

      {weather ? (
  weather.cod === 200 ? (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        width={100}
        height={100}
        className="mx-auto"
      />
      <p className="text-lg capitalize">{weather.weather[0].description}</p>
      <p className="text-3xl font-bold mt-2">{Math.round(weather.main.temp)}°C</p>
      <div className="mt-3 text-sm opacity-80">
        <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  ) : (
    <p className="text-red-300">City not found 😢</p>
  )
) : null}
    </main>
  );
}
