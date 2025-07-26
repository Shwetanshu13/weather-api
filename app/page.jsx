"use client";

import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import LocationSearch from "../components/LocationSearch";
import { WeatherService } from "../components/WeatherService";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample data for initial display

  const sampleWeatherData = {
    coord: {
      lon: 7.367,
      lat: 45.133,
    },
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 284.2,
      feels_like: 282.93,
      temp_min: 283.06,
      temp_max: 286.82,
      pressure: 1021,
      humidity: 60,
      sea_level: 1021,
      grnd_level: 910,
    },
    visibility: 10000,
    wind: {
      speed: 4.09,
      deg: 121,
      gust: 3.47,
    },
    rain: {
      "1h": 2.73,
    },
    clouds: {
      all: 83,
    },
    dt: 1726660758,
    sys: {
      type: 1,
      id: 6736,
      country: "IT",
      sunrise: 1726636384,
      sunset: 1726680975,
    },
    timezone: 7200,
    id: 3165523,
    name: "Province of Turin",
    cod: 200,
  };

  // Data from Pompore
  const fetchPomporeWeatherData = async () => {
    try {
      const response = await WeatherService.getCurrentWeather(34.02, 74.93); // Coordinates for Pompore
      setWeatherData(response);
      console.log("Pompore weather data fetched successfully:", response.data);
    } catch (err) {
      console.error("Error fetching Pompore weather data:", err);
      setWeatherData(sampleWeatherData);
      setError("Failed to fetch Pompore weather data");
    }
  };

  useEffect(() => {
    // Display sample data on initial load
    fetchPomporeWeatherData();
  }, []);

  const handleLocationSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await WeatherService.getCurrentWeatherByCity(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const location = await WeatherService.getUserLocation();
      const data = await WeatherService.getCurrentWeather(
        location.lat,
        location.lon
      );
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (weatherData?.coord) {
      handleLocationSearch(weatherData.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Climate Controller
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal weather dashboard
          </p>
        </header>

        {!loading && !error && weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}

        {/* Location Search */}
        <LocationSearch onSearch={handleLocationSearch} isLoading={loading} />

        {/* Get Current Location Button */}
        <div className="max-w-4xl mx-auto px-6 mb-6">
          <div className="text-center">
            <button
              onClick={handleGetCurrentLocation}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              📍 Use My Current Location
            </button>
          </div>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage error={error} onRetry={handleRetry} />
        )}

        {/* Instructions */}
        {!hasSearched && !loading && weatherData && (
          <div className="max-w-4xl mx-auto px-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center">
              <p className="text-gray-600">
                👆 This is sample weather data from Turin, Italy. Search for any
                city or use your current location to see live weather data!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
