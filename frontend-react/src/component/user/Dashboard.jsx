import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { WeatherAPI, WEATHER_APIKEY } from '../axios/AxiosInstance';
import { CityAPIURL } from '../axios/AxiosInstance';

export default function Dashboard() {

    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [noresults, setNoResults] = useState(false);

    const [cityWeatherList, setCityWeatherList] = useState([]);

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

    const removeCity = async ( index, cityID ) => {
        let currentCityWeatherList = [...cityWeatherList];
        currentCityWeatherList.splice( index, 1 );
        setCityWeatherList(currentCityWeatherList);

        const cityData  = {
            cityID : cityID,
            token  : accessToken
        };
        await CityAPIURL.delete('/delete-city.php', { data : cityData })
        .then( response => {
            // console.log(response.data);
        } );
    }

    const addCity = (slug, name) => {
        const cityData  = {
            cityname : name,
            cityslug : slug,
            token    : accessToken
        };
        CityAPIURL.post('/add-city.php', cityData)
        .then(function (response) {
            const responseData = response.data;

            if( responseData.status == 'success' ) {
                setResults([]);
                setNoResults(false);
                const cityData = fetchWeather(slug);
                cityData.then( data => setCityWeatherList([...cityWeatherList, data]) );
            } else {
                alert(responseData.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const fetchWeather = async(city, city_id) => {
        const query = '/current.json?key='+ WEATHER_APIKEY +'&q=' + city;
        try {
            const response = await WeatherAPI.get(query)
            const responseData = response.data;
            const dataObj = {
                cityID : city_id,
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
            return dataObj;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    useEffect( () => {
        let allCityWeatherData = [];
        const fetchAllCityWeather = async () => {
            return await CityAPIURL.post('/city.php', {token: accessToken})
            .then(function (response) {
                const responseData = response.data;
                if( responseData.status == 'success' ) {
                    responseData.cities.map( async (city, i) => {
                        fetchWeather(city.city_slug, city.city_id).then( data => { allCityWeatherData.push(data) });
                    } )
                } else {
                    console.log(responseData.message);
                }
                return allCityWeatherData;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        fetchAllCityWeather().then( data => {
            setTimeout(()=> {
                setCityWeatherList(data);
            }, 1000);
            // console.log(data);
        });
    }, [] );

    return (
        <>
            <div className="atf-page-heading atf-size-md"
                style={{
                backgroundImage: "url(assets/img/bg/6.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center center"
                }}      
            >
                <div className="container" >
                    <div className="row" >
                        <div className="atf-page-heading-in text-center" >
                            <h1 className="atf-page-heading-title">Welcome { decoded.name }</h1>
                            <div className="col-xl-5 mx-auto">
                                <div className="contact mt-4" >
                                    <div className="atf-search-area">
                                        <form className="form-group" onSubmit={handleSubmit}>
                                            <input type="search" minLength={3} name="query" className="form-control" id="Search" placeholder="Search..." required="required" value={query} onChange={handleChange} />
                                            <button type="submit" className="atf-themes-btn"><span /><span /><span /><span />Add City</button>
                                        </form>
                                        {
                                            results.length > 0 ? 
                                            <>
                                            <ul className='autocomplete-city'>
                                                {results.map((result, index) => {                                                
                                                    const cityName = (result.name + ', ' + result.region + ', ' + result.country);
                                                    return (
                                                        <li onClick={() => addCity(result.url, cityName)} key={index}>{cityName}</li>
                                                    );
                                                
                                                })}
                                            </ul>
                                            </> 
                                            : null
                                        }
                                        {
                                            noresults ?
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
                        </div>
                    </div>
                </div>
            </div>

            <section id="" className="atf-contact-area atf-section-padding bg-light" >
                <div className="container" >
                    <div className="row">
                        
                        {
                            cityWeatherList.map((cityWeather, index) => {
                                return (
                                    <div key={index} className="col-xl-4 col-md-6 mb-4" >
                                        <div className="atf-hlight-content style1" >
                                            <div onClick={() => removeCity(index, cityWeather.cityID)} className="removeCity">&times;</div>
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
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                {/*- END ROW */}
                </div>
                {/*- END CONTAINER */}
            </section>
        </>
    )
}
