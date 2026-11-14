import { useSelector } from "react-redux";

const CurrentWeather = () => {
  const current = useSelector((state) => state.current);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  if (loading) {
    return (
      <div className="mt-5 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error mt-5">
        <p>{error}</p>
      </div>
    );
  }

  if (!current) {
    return (
      <p className="mt-5 text-center">
        Search a city to see weather.
      </p>
    );
  }

  const temperature = Math.round(current.main.temp - 273.15);
  const feelsLike = Math.round(current.main.feels_like - 273.15);

  return (
    <div className="card bg-neutral text-neutral-content w-full max-w-md mt-5 shadow-xl">
      <div className="card-body items-center text-center">

        {/* City Name */}
        <h2 className="text-2xl font-bold">
          {current.name}, {current.sys.country}
        </h2>

        {/* Weather Icon */}
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt={current.weather[0].description}
          className="w-24 h-24"
        />

        {/* Temperature */}
        <h1 className="text-6xl font-bold">
          {temperature}°C
        </h1>

        <p className="capitalize text-lg">
          {current.weather[0].description}
        </p>

        <div className="divider"></div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-5 w-full">

          <div>
            <p className="text-sm opacity-70">Feels Like</p>
            <h3 className="text-xl font-semibold">
              {feelsLike}°C
            </h3>
          </div>

          <div>
            <p className="text-sm opacity-70">Humidity</p>
            <h3 className="text-xl font-semibold">
              {current.main.humidity}%
            </h3>
          </div>

          <div>
            <p className="text-sm opacity-70">Wind Speed</p>
            <h3 className="text-xl font-semibold">
              {current.wind.speed} m/s
            </h3>
          </div>

          <div>
            <p className="text-sm opacity-70">Pressure</p>
            <h3 className="text-xl font-semibold">
              {current.main.pressure} hPa
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
