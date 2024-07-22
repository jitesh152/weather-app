import axios from "axios";

export const WeatherAPI = axios.create({
    baseURL : 'https://api.weatherapi.com/v1'
});

export const WEATHER_APIKEY = '99ca7774bcd64aa881342829240205';

export const AuthURL = axios.create({
    baseURL : 'http://localhost/weather-app-api/auth',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const CityAPIURL = axios.create({
    baseURL : 'http://localhost/weather-app-api/users',
    headers: {
        'Content-Type': 'application/json',
    }
});