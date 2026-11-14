import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, setCity } from "../store/actions/weatherActions";

const Search = () => {
  const dispatch = useDispatch();
  const [city, setCity1] = useState("");

  const handleSearch = () => {
    const searchCity = city.trim();

    if (!searchCity) return;

    dispatch(setCity(searchCity));
    dispatch(fetchWeather(searchCity));

    console.log("Searching:", searchCity);
  };

  return (
    <div className="join">
      <label className="input validator join-item">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </g>
        </svg>

        <input
          type="search"
          placeholder="Search Weather"
          required
          value={city}
          onChange={(e) => setCity1(e.target.value)}
        />
      </label>

      <button
        className="btn btn-accent join-item"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;