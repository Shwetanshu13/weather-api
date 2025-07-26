"use client";

export default function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 text-lg">No weather data available</div>
      </div>
    );
  }

  const { name, main, weather, wind, clouds, visibility, rain, sys, coord } =
    weatherData;

  const weatherCondition = weather[0];
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);

  // Convert unix timestamp to readable time
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl shadow-2xl text-white overflow-hidden">
        {/* Header Section */}
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {name}, {sys.country}
              </h1>
              <p className="text-blue-100 text-sm">
                {coord.lat.toFixed(3)}°, {coord.lon.toFixed(3)}°
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-light mb-2">{temperature}°</div>
              <div className="text-blue-100">Feels like {feelsLike}°</div>
            </div>
          </div>
        </div>

        {/* Weather Condition */}
        <div className="px-8 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`}
              alt={weatherCondition.description}
              className="w-16 h-16"
            />
            <div>
              <div className="text-2xl font-semibold capitalize">
                {weatherCondition.description}
              </div>
              <div className="text-blue-100">{weatherCondition.main}</div>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="bg-white/10 backdrop-blur-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <WeatherDetail
              icon="🌡️"
              label="Min / Max"
              value={`${Math.round(main.temp_min)}° / ${Math.round(
                main.temp_max
              )}°`}
            />
            <WeatherDetail
              icon="💧"
              label="Humidity"
              value={`${main.humidity}%`}
            />
            <WeatherDetail
              icon="🌪️"
              label="Wind Speed"
              value={`${wind.speed} m/s`}
            />
            <WeatherDetail
              icon="👁️"
              label="Visibility"
              value={`${(visibility / 1000).toFixed(1)} km`}
            />
            <WeatherDetail
              icon="🏔️"
              label="Pressure"
              value={`${main.pressure} hPa`}
            />
            <WeatherDetail
              icon="☁️"
              label="Cloud Cover"
              value={`${clouds.all}%`}
            />
            <WeatherDetail icon="🌅" label="Sunrise" value={sunrise} />
            <WeatherDetail icon="🌇" label="Sunset" value={sunset} />
          </div>

          {/* Rain Information */}
          {rain && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌧️</span>
                <div>
                  <div className="font-semibold">Rainfall</div>
                  <div className="text-blue-100">
                    {rain["1h"]
                      ? `${rain["1h"]} mm in last hour`
                      : "Recent precipitation"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wind Direction */}
          {wind.deg && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧭</span>
                <div>
                  <div className="font-semibold">Wind Direction</div>
                  <div className="text-blue-100">
                    {wind.deg}° {wind.gust ? `(Gusts: ${wind.gust} m/s)` : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WeatherDetail({ icon, label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-blue-100 mb-1">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
