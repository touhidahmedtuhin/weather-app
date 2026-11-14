import {
  FETCH_WEATHER_PENDING,
  FETCH_CURRENT_SUCCESS,
  FETCH_FORECAST_SUCCESS,
  FETCH_WEATHER_ERROR,
  SET_CITY,
} from "../constants/weatherConstants";
import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export const fetchWeatherPending = () => ({
  type: FETCH_WEATHER_PENDING,
});

export const fetchCurrentSuccess = (data) => ({
  type: FETCH_CURRENT_SUCCESS,
  payload: data,
});

export const fetchForecastSuccess = (data) => ({
  type: FETCH_FORECAST_SUCCESS,
  payload: data,
});

export const fetchWeatherError = (error) => ({
  type: FETCH_WEATHER_ERROR,
  payload: error,
});

export const setCity = (city) => ({
  type: SET_CITY,
  payload: city,
});

export const fetchWeather = (city) => {
  return async (dispatch) => {
        dispatch(fetchWeatherPending());
    try {
      const currentWeatherDetails = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
      );

      const forecastDetails = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
      );

      dispatch(fetchCurrentSuccess(currentWeatherDetails.data));

      dispatch(fetchForecastSuccess(forecastDetails.data.list));
    } catch (error) {
      dispatch(
        fetchWeatherError(error.response?.data?.message || error.message),
      );
    }
  };
};
