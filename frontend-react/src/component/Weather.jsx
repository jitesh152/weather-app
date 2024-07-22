import React, { useEffect, useState } from 'react';
import { WeatherAPI, WEATHER_APIKEY } from './axios/AxiosInstance';
import { useParams } from 'react-router-dom';

export default function Weather() {

    const {city} = useParams();
    const [error, setError] = useState(false);

    const [cityWeather, setCityWeather] = useState({
        cityName : '',
        temperature : '',
        weatherIcon : '',
        weatherInfo : '',
        windSpeed : '',
        windDirection : '',
        pressureMb : '',
        humidity : '',
        uvIndex : '',
        visibility : '',
    });

    useEffect( () => {
        const fetchWeather = async() => {
            const query = '/current.json?key='+ WEATHER_APIKEY +'&q=' + city;
            await WeatherAPI.get(query)
            .then( (response) => {
                // console.log(response);
                const responseData = response.data;

                const dataObj = {
                    cityName : responseData.location.name,
                    temperature : responseData.current.temp_c,
                    weatherIcon : responseData.current.condition.icon,
                    weatherInfo : responseData.current.condition.text,
                    windSpeed : responseData.current.wind_kph,
                    windDirection : responseData.current.wind_dir,
                    pressureMb : responseData.current.pressure_mb,
                    humidity : responseData.current.humidity,
                    uvIndex : responseData.current.uv,
                    visibility : responseData.current.vis_km,
                }

                setCityWeather(dataObj);
            } )
            .catch( (error) => {
                console.log(error);
                setError(true);
            } )
        }

        fetchWeather();
    },[] );

    return (
        <>
        <div
        className="atf-page-heading atf-size-md"
        style={{
            backgroundImage: "url(assets/img/bg/6.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}
        
        >
        <div className="container" >
            <div className="row" >
            <div className="atf-page-heading-in text-center" >
                <h1 className="atf-page-heading-title">
                    {
                        !error ?
                        <>
                        {cityWeather.cityName} Weather Info
                        </>
                        :
                        <>
                        Invalid City Code
                        </>
                    }
                    
                </h1>
            </div>
            </div>
        </div>
        </div>
        {
            !error ?
            <>
            <section className="atf-weekly-forcast bg-white">
                <div className="atf-section-padding" >
                    <div className="container" >
                        <div className="row" >
                            <div className="col-lg-12 col-12" >
                                <h2 className="atf-weather-hlight mb-5 text-center">Today's Highlights</h2>
                                <div className="row align-items-center" >
                                    <div className="col-xl-5 col-12" >
                                        <div className="atf-weather">
                                            {
                                                ( cityWeather.cityName !== '' ) ?
                                                <>
                                                <div className="atf-hlight-content style1 bg-light" >
                                                    <div className="d-flex" >
                                                        <div className="atf-weather-icon" >
                                                        <span className="">
                                                            {
                                                                (cityWeather.weatherIcon !== '') ? 
                                                                <>
                                                                    <img src={cityWeather.weatherIcon} alt="weather icon" />
                                                                </>
                                                                : null
                                                            }
                                                            
                                                        </span>
                                                        </div>
                                                        <div className="atf-weather-location" >
                                                            <h3 className=""> {cityWeather.cityName}</h3>
                                                            <span className=''>{cityWeather.weatherInfo}</span>
                                                        </div>
                                                        <div className="atf-weather-deg" >
                                                            <h2 className="">{cityWeather.temperature} <sup>0</sup>C</h2>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="atf-sub-weather" >
                                                        <div className="row" >
                                                        <div className="col-6 mb-xl-4" >
                                                            <div className="d-inline-flex" >
                                                            <div className="atf-weather-icon" >
                                                                <span className=""><i class="fa-regular fa-eye"></i></span>
                                                            </div>
                                                            <div className="atf-weather-location" >
                                                                <h5 className=""> Visibility</h5>
                                                                <span className=""> {cityWeather.visibility}KM</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 mb-xl-4" >
                                                            <div className="d-inline-flex" >
                                                            <div className="atf-weather-icon" >
                                                                <span className=""><i class="fa-solid fa-sun"></i></span>
                                                            </div>
                                                            <div className="atf-weather-location" >
                                                                <h5 className=""> UV Index</h5>
                                                                <span className="">{cityWeather.uvIndex} </span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6" >
                                                            <div className="d-inline-flex" >
                                                            <div className="atf-weather-icon" >
                                                                <span className=""><i className="fa-solid fa-cloud-rain" /></span>
                                                            </div>
                                                            <div className="atf-weather-location" >
                                                                <h5 className=""> Humidity</h5>
                                                                <span className="">{cityWeather.humidity} </span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6" >
                                                            <div className="d-inline-flex" >
                                                            <div className="atf-weather-icon" >
                                                                <span className=""><i className="fa-solid fa-wind" /></span>
                                                            </div>
                                                            <div className="atf-weather-location" >
                                                                <h5 className=""> WindSpeed</h5>
                                                                <span className=""> {cityWeather.windSpeed}KM/H, {cityWeather.windDirection}</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-7 mt-xl-40" >
                                        <div className="row" >
                                            <div className="col-6" >
                                                <div className="atf-weather-report">
                                                <div className="atf-report-img mb-2" >
                                                    <i class="fa-solid fa-sun fa-4x"></i>
                                                </div>
                                                <h3> UV Index </h3>
                                                <div className="atf-weather-number">
                                                    <span>{cityWeather.uvIndex}</span>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-6" >
                                                <div className="atf-weather-report">
                                                <div className="atf-report-img mb-2" >
                                                    <i class="fa-solid fa-wind fa-4x"></i>
                                                </div>
                                                <h3> WindSpeed </h3>
                                                <h2>{cityWeather.windSpeed}KM</h2>
                                                </div>
                                            </div>
                                        
                                            <div className="col-6" >
                                                <div className="atf-weather-report">
                                                <div className="atf-report-img mb-2" >
                                                    <i class="fa-solid fa-cloud-rain fa-4x"></i>
                                                </div>
                                                <h3>Humidity </h3>
                                                <h2>{cityWeather.humidity}KM</h2>
                                                </div>
                                            </div>
                                            <div className="col-6" >
                                                <div className="atf-weather-report">
                                                <div className="atf-report-img mb-2" >
                                                    <i class="fa-solid fa-eye fa-4x"></i>
                                                </div>
                                                <h3> Visibility </h3>
                                                <h2>{cityWeather.visibility}KM</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
            : null
        }
        </>
    )
}
