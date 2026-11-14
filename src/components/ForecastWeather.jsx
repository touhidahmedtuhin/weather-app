
import React from "react";
import { useSelector } from "react-redux";

const ForecastWeather = () => {
  const forecast = useSelector((state) => state.forecast);

  if (!forecast || forecast.length === 0) {
    return (
      <p className="mt-5 text-center">
        No forecast data available.
      </p>
    );
  }

  // Group forecast data by date
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  // Select one forecast closest to 12 PM for each day
  const dailyForecast = Object.values(groupedForecast).map((items) => {
    return items.reduce((closest, item) => {
      const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
      const closestHour = Number(
        closest.dt_txt.split(" ")[1].slice(0, 2)
      );

      return Math.abs(hour - 12) < Math.abs(closestHour - 12)
        ? item
        : closest;
    });
  });

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-5">
        5 Days Weather Forecast
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecast.map((item) => (
          <div
            key={item.dt}
            className="card bg-base-200 shadow-md"
          >
            <div className="card-body items-center text-center p-4">

              <h3 className="font-semibold">
                {new Date(item.dt * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  }
                )}
              </h3>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="w-20 h-20"
              />

              <h2 className="text-3xl font-bold">
                {Math.round(item.main.temp - 273.15)}°C
              </h2>

              <p className="capitalize text-sm">
                {item.weather[0].description}
              </p>

              <div className="divider my-1"></div>

              <p className="text-sm">
                Feels Like:{" "}
                {Math.round(item.main.feels_like - 273.15)}°C
              </p>

              <p className="text-sm">
                Humidity: {item.main.humidity}%
              </p>

              <p className="text-sm">
                Wind: {item.wind.speed} m/s
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather;
