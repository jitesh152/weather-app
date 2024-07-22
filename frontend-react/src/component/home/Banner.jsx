import React, { useEffect, useState } from 'react';
import { WeatherAPI, WEATHER_APIKEY } from '../axios/AxiosInstance';

export default function Banner() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [noresults, setNoResults] = useState(false);

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

    const handleChange = (e) => {
        setQuery( e.target.value );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCity(query);
    }

    const fetchCity = async( city ) => {
        const query = '/search.json?key='+ WEATHER_APIKEY +'&q=' + city;
        await WeatherAPI.get(query)
        .then( (response) => {
            // console.log(response.data);
            const responseData = response.data;
            if (responseData.length === 0) {
                setNoResults(true);
                setResults([]);
            } else {
                setResults(responseData);
                setNoResults(false);
            }
        } )
        .catch( (error) => {
            console.log(error);
        } )
    }

    const fetchWeather = async(city) => {
        const query = '/current.json?key='+ WEATHER_APIKEY +'&q=' + city;
        await WeatherAPI.get(query)
        .then( (response) => {
            //console.log(response.data);
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

            setQuery('');
            setResults([]);

            setCityWeather(dataObj);
        } )
        .catch( (error) => {
            console.log(error);
        } )
    }

    useEffect( () => {
        fetchWeather('new-delhi');
    },[] );

  return (    
    <>
    <section className="atf-home-area atf-align-items-details atf-width-area"
        style={{
            backgroundImage: "url(assets/img/bg/1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}
    >
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 pe-lg-5">
                <div className="atf-single-details text-start">
                    <h2>Climate Change <br /> Weather Forcast</h2>
                    <p className="border-left ps-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed <br /> do elit eiusmod tempor incididunt ut labore et dolore.</p>
                    
                    <div className="atf-search-area">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <input type="search" minLength={3} name="query" className="form-control" id="Search" placeholder="Search..." required="required" value={query} onChange={handleChange} />
                            <button type="submit" className="atf-themes-btn"><span /><span /><span /><span />Search now</button>
                        </form>
                        {
                            results.length > 0 ? 
                            <>
                            <ul className='autocomplete-city'>
                                {results.map((result, index) => (
                                    <li onClick={() => fetchWeather(result.url)} key={index}>{result.name}, {result.region}, {result.country}</li>
                                ))}
                            </ul>
                            </> 
                            : null
                        }
                        {
                            noresults === true ?
                            <>
                            <ul className='autocomplete-city cursor-auto'>
                                <li>No result found</li>
                            </ul>
                            </>
                            : null
                        }
                    </div>
                </div>
                </div>
                {/*- END COL */}
                <div className="col-lg-6 mt-lg-40">
                    <div className="atf-weather">
                        {
                            ( cityWeather.cityName !== '' ) ?
                            <>
                            <div className="atf-hlight-content style1" >
                                <div className="d-flex" >
                                    <div className="atf-weather-icon" >
                                    <span className="text-white">
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
                                        <h3 className="text-white"> {cityWeather.cityName}</h3>
                                        <span className='text-white'>{cityWeather.weatherInfo}</span>
                                    </div>
                                    <div className="atf-weather-deg" >
                                        <h2 className="text-white">{cityWeather.temperature} <sup>0</sup>C</h2>
                                    </div>
                                </div>
                                <hr />
                                <div className="atf-sub-weather" >
                                    <div className="row" >
                                    <div className="col-6" >
                                        <div className="d-inline-flex" >
                                        <div className="atf-weather-icon" >
                                            <span className="text-white"><i className="fa-regular fa-eye"></i></span>
                                        </div>
                                        <div className="atf-weather-location" >
                                            <h5 className="text-white"> Visibility</h5>
                                            <span className="text-white"> {cityWeather.visibility}KM</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-6" >
                                        <div className="d-inline-flex" >
                                        <div className="atf-weather-icon" >
                                            <span className="text-white"><i className="fa-solid fa-sun"></i></span>
                                        </div>
                                        <div className="atf-weather-location" >
                                            <h5 className="text-white"> UV Index</h5>
                                            <span className="text-white">{cityWeather.uvIndex} </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-6" >
                                        <div className="d-inline-flex" >
                                        <div className="atf-weather-icon" >
                                            <span className="text-white"><i className="fa-solid fa-cloud-rain" /></span>
                                        </div>
                                        <div className="atf-weather-location" >
                                            <h5 className="text-white"> Humidity</h5>
                                            <span className="text-white">{cityWeather.humidity} </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-6" >
                                        <div className="d-inline-flex" >
                                        <div className="atf-weather-icon" >
                                            <span className="text-white"><i className="fa-solid fa-wind" /></span>
                                        </div>
                                        <div className="atf-weather-location" >
                                            <h5 className="text-white"> WindSpeed</h5>
                                            <span className="text-white"> {cityWeather.windSpeed}KM/H, {cityWeather.windDirection}</span>
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
                {/*- END COL */}
            </div>
            {/*- END ROW */}
        </div>
        {/*- END CONTAINER */}
    </section>
    {/* END HOME CLIP*/}
    </>
    
  )
}
