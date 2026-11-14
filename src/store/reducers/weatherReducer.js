import { FETCH_CURRENT_SUCCESS,FETCH_FORECAST_SUCCESS, FETCH_WEATHER_ERROR, FETCH_WEATHER_PENDING, SET_CITY } from "../constants/weatherConstants";

const initialState = {
    city:"Dhaka",
    current:null,
    forecast: null,
    loading:false,
    error:null,
}

export const weatherReducer = (state=initialState ,action)=>{
    switch (action.type) {
        case FETCH_WEATHER_PENDING:
            return {
                ...state,
                loading:true,
                error:null
            }
        case FETCH_CURRENT_SUCCESS:
            return {
                ...state,
                current:action.payload,
                loading:false
            }
        case FETCH_FORECAST_SUCCESS:
            return {
                ...state,
                forecast:action.payload,
                loading:false
            }
        case FETCH_WEATHER_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        case SET_CITY:
            return {
                ...state,
                city:action.payload
            }
        default:
            return state
    }
}