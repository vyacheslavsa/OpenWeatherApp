import React, { useRef } from 'react'
import styles from './Content.module.scss'
import './style.scss'
import moment from "moment";
import {ReactComponent as ImageError} from "../../image/error_FILL0_wght400_GRAD0_opsz48.svg"
import {ReactComponent as SunnyIcon} from "../../image/sunny.svg"
import {ReactComponent as SmallCloudyIcon} from "../../image/small_cloudy.svg"
import {ReactComponent as CloudyIcon} from "../../image/cloudy.svg"
import {ReactComponent as BrokeCloudsIcon} from "../../image/broken_clouds.svg"
import {ReactComponent as RainIcon} from "../../image/rain.svg"
import {ReactComponent as RainSunIcon} from "../../image/rain_sun.svg"
import {ReactComponent as ThunderstormIcon} from "../../image/thunderstorm.svg"
import {ReactComponent as SnowIcon} from "../../image/snow.svg"
import {ReactComponent as FogIcon} from "../../image/fog.svg"
import {ReactComponent as NightIcon} from "../../image/night.svg"
import {ReactComponent as SmallCloudyIconNight} from "../../image/small_cloudy_night.svg"
import {ReactComponent as CloudyIconNight} from "../../image/small_cloudy_night.svg"
import {ReactComponent as RainMoonIcon} from "../../image/rain_night_moon.svg"

export default function Content({ data, errors, loading }) {

    const descriptionWeather = data?.current?.weather[0]?.description[0].toUpperCase()+data?.current?.weather[0]?.description.slice(1);
    const mmHgPressure = Math.round(data?.current?.pressure * 0.75006375541921);
    const tempRef = useRef();
    const currentGEO = JSON.parse(localStorage.getItem('GEOLOCATIONS'));

    const currentImageWeather = (item) => {
        console.log(item)
        switch (item ? item : data?.current?.weather[0]?.icon) {
            case '01d':
                return <SunnyIcon/>
            case '02d':
                return <SmallCloudyIcon/>
            case '03d':
                return <CloudyIcon/>
            case '04d':
                return <BrokeCloudsIcon/>
            case '09d':
                return <RainIcon/>
            case '10d':
                return <RainSunIcon/>
            case '11d':
                return <ThunderstormIcon/>
            case '13d':
                return <SnowIcon/>
            case '50d':
                return <FogIcon/>
            case '01n':
                return <NightIcon/>
            case '02n':
                return <SmallCloudyIconNight/>
            case '03n':
                return <CloudyIconNight/>
            case '04n':
                return <BrokeCloudsIcon/>
            case '09n':
                return <RainIcon/>
            case '10n':
                return <RainMoonIcon/>
            case '11n':
                return <ThunderstormIcon/>
            case '13n':
                return <SnowIcon/>
            case '50n':
                return <FogIcon/>
            default:
                return <BrokeCloudsIcon/>
        }
    }

    if(Object.keys(errors).length > 0) return (
        <div className={styles.content}>
            <div className={styles.errorContent}>
                <ImageError/>
                <div>{errors}</div>
            </div>
        </div>
    );

  return (
    <div className={styles.content}>
        {!loading && !!Object.keys(data).length && currentImageWeather ?
        <div className={styles.weatherPanel}>
            <div className={styles.currentWeather}>
                <div className={styles.leftInfo}>
                    <div>{currentGEO.name}</div>
                    <div className={styles.descriptionWeather}>{descriptionWeather}
                        <div className={styles.iconWeather}>
                            {currentImageWeather()}
                        </div>
                    </div>
                    <div>Today  {moment.unix(data?.current?.dt).format('Do MMMM')}</div>
                </div>
                <div
                    className={styles.rightInfo}
                    ref={tempRef}
                >{Math.round(data.current?.temp)}&deg;</div>
            </div>
            <div className={styles.hourly}>
                <div>Hourly Forecast</div>
                <div className={styles.iconHourse}>
                    {[...new Array(10).keys()].map((_, index) =>
                        <div key={index}>{currentImageWeather(data?.hourly[index]?.weather[0]?.icon)}</div>
                    )}
                </div>
                <div className={styles.dayWeather}>
                    <div className={styles.times}>
                        {[...new Array(10).keys()]
                        .map(index =>
                            <div key={index} className={styles.itemTime}>{moment.unix(data?.hourly[index+1]?.dt).format('LT')}</div>
                        )}
                    </div>
                    <div className={styles.tempHourse}>
                        {[...new Array(10).keys()]
                            .map(index =>
                                <div key={index}>{Math.round(data?.hourly[index+1]?.temp)}&deg;</div>
                            )}
                    </div>
                </div>
            </div>
            <div className={styles.week}>
                <div className={styles.leftInfoWeek}>
                    <div className={styles.day}>
                        {[...new Array(7).keys()]
                            .map(index =>
                                <div key={index}>{moment.unix(data?.daily[index+1]?.dt).format('dddd')}</div>
                            )}
                    </div>
                    <div className={styles.icons}>
                        {[...new Array(7).keys()]
                            .map(index =>
                                <div key={index}>{moment.unix(data?.daily[index+1]?.dt).format('MMMM Do')}</div>
                            )}
                    </div>
                    <div className={styles.dayTemp}>
                        {[...new Array(7).keys()]
                            .map(index =>
                                <div key={index}>{Math.round(data.daily[index+1]?.temp?.day)}&deg;</div>
                            )}
                    </div>
                    <div className={styles.nightTemp}>
                        {[...new Array(7).keys()]
                            .map(index =>
                                <div key={index}>{Math.round(data.daily[index+1]?.temp?.night)}&deg;</div>
                            )}
                    </div>
                </div>
                <div className={styles.rightInfoWeek}>
                    <div className={styles.moreInformation}>
                        <div>Sunrise: {moment.unix(data?.current?.sunrise).format('LT')}</div>
                        <div>Sunset: {moment.unix(data?.current?.sunset).format('LT')}</div>
                        <div>Humidity: {data?.current?.humidity} %</div>
                        <div>Atmosphere Pressure: {mmHgPressure} mmHg</div>
                        <div>Wind speed: {data?.current?.wind_speed} m/s</div>
                    </div>
                </div>
            </div>
        </div>
            :
        <div className="lds-dual-ring"/>
        }
    </div>
  )
}



