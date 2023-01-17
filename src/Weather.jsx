import React, { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import BackgroundVideo from './components/BackgroundVideo'

const content = css`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%; 
    min-height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const boxStyle = css`
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 80%;
    padding: 2rem;
    text-align: center;
    margin-bottom: 1em;
    margin-top: 1em;
    max-width: 1280px;
`

const forecastGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    gap: 1em;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
`

const forcastGridItemStyle = css`
    grid-column-end: span 1;
`

// const inputStyle = css`
//     padding: 12px;
//     font-size: 18px;
//     border-width: 1px;
//     border-color: #CCCCCC;
//     background-color: #FFFFFF;
//     color: #000000;
//     border-style: solid;
//     border-radius: 7px;
//     box-shadow: 0px 0px 5px rgba(66,66,66,.75);

//     &:focus {
//         outline:none;
//     }
// `

function Weather() {
    const [location, setLocation] = useState({ lat: undefined, lng: undefined })
    const [weatherData, setWeatherData] = useState()
    // const [zipcode, setZipcode] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        if (location.lat && location.lng) {
            let gridId, gridX, gridY
            fetch(`https://api.weather.gov/points/${location.lat},${location.lng}`)
                .then(res => res.json())
                .then(data => {
                    gridId = data.properties.gridId
                    gridX = data.properties.gridX
                    gridY = data.properties.gridY
                    if (gridId && gridX && gridY) {
                        fetch(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`)
                            .then(res => res.json())
                            .then(data => setWeatherData(data.properties.periods) )
                        }
                    }
                )
                .catch(er => console.log(er))
        }
    }, [location]);

    // const handleChange = (event) => {
    //     setZipcode(event.target.value)
    // }

    // const handleSummit = () => {
    //     console.log(zipcode)
    // }

    return weatherData && (
        <div>
            <BackgroundVideo condition={weatherData[0].shortForecast} />
            <div className={content}>
                {/* <div className={boxStyle}>
                    <input className={inputStyle} type="text" placeholder="Enter a zipcode" val2e={zipcode} onChange={handleChange} />
                    <button type="button" onClick={handleSummit}>Set</button>
                </div> */}
                <div className={boxStyle}>
                    <h3>{weatherData[0].name}</h3>
                    <h1>{weatherData[0].temperature}&#176;{weatherData[0].temperatureUnit}</h1>
                    <img alt={weatherData[0].shortForecast} src={weatherData[0].icon} />
                    <h2>{weatherData[0].shortForecast}</h2>
                    <p>{weatherData[0].detailedForecast}</p>
                </div>
                <div className={boxStyle}>
                    <div className={forecastGridStyle}>
                        {
                            weatherData.map((period, index) => {
                                if (index !== 0 && index % 2 === 0) {
                                    return (
                                        <div className={forcastGridItemStyle} key={index}>
                                            <h3>{period.name}</h3>
                                            <h4>{period.temperature}&#176;{period.temperatureUnit}</h4>
                                            <p>&#127788;{period.windSpeed}</p>
                                            <img alt={period.shortForecast} src={period.icon} />
                                            <p>{period.shortForecast}</p>
                                        </div>
                                    )
                                }
                                return <></>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather