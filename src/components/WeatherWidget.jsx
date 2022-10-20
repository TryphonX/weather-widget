import axios from 'axios';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Image, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';
import '../css/weatherWidget.css';
import DayPicker from './WeatherWidget/DayPicker';
import MaxTempChart from './WeatherWidget/MaxTempChart';


const WeatherWidget = () => {

	const [weatherRes, setWeatherRes] = useState();
	const [weatherIcon, setWeatherIcon] = useState();
	const [weatherIconAltText, setWeatherIconAltText] = useState();
	const [selectedDay, setSelectedDay] = useState(0);
	
	const dayToday = new Date().getDay();

	useEffect(() => {
		axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric').then((res) => {
			
			if (res.status === 200) {
				setWeatherRes(res.data);

				setWeatherIcon(`http://openweathermap.org/img/wn/${res.data.current.weather[0]?.icon}@2x.png`);
				setWeatherIconAltText(res.data.current.weather[0].description);
			}
			else console.warn(`Status ${res.status} | Satus Text: ${res.statusText} @ WeatherWidget`);
		});
	}, []);

	useEffect(() => {
		if (weatherRes) {
			if (selectedDay === 0) {
				setWeatherIcon(`http://openweathermap.org/img/wn/${weatherRes.current.weather[0]?.icon}@2x.png`);
				setWeatherIconAltText(weatherRes.current.weather[0].description);
			}
			else {
				setWeatherIcon(`http://openweathermap.org/img/wn/${weatherRes.daily[selectedDay].weather[0]?.icon}@2x.png`);
			}
		}
	}, [selectedDay]);

	/**
	 * Converts m/s to km/h.
	 * @param ms The value in m/s
	 * @returns kmh value
	 */
	const msToKmh = (ms) => ms * 3.6;


	if (weatherRes && weatherIcon) {

		const windDegreesOverlay = (degrees) => (
			<Tooltip>
				{degrees}°
			</Tooltip>
		);

		const getWeatherInfo = () => {

			if (selectedDay === 0) {
				return (
					<Fragment>
						<Col>
							<h3>Thessaloniki</h3>
							<p>
								Temperature: {Math.round(weatherRes.current.temp)}°C
								<br />
								<span className='small'>Feels like: {Math.round(weatherRes.current.feels_like)}°C</span>
							</p>
						</Col>
						<Col className='small'>
							<Container className='rounded pt-1 pb-1 semi-dark-bg'>
								<p className='m-0'>
									Wind: {Math.round(msToKmh(weatherRes.current.wind_speed))} km/h 
									
									<OverlayTrigger overlay={windDegreesOverlay(weatherRes.current.wind_deg)}>
										<span> <ArrowUp style={{ transform: `rotate(${weatherRes.current.wind_deg}deg)` }} /></span>
									</OverlayTrigger>
									
									<br />
									Humidity: {Math.round(weatherRes.current.humidity)}%
									<br />
									Pressure: {weatherRes.current.pressure} hPa
								</p>
							</Container>
						</Col>
					</Fragment>
				);
			}

			else {
				const dailyWeatherObj = weatherRes.daily[selectedDay];

				const avgTemp = (dailyWeatherObj.temp.day + dailyWeatherObj.temp.night + dailyWeatherObj.temp.eve + dailyWeatherObj.temp.morn) / 4;
				const avgFeelsLike = (dailyWeatherObj.feels_like.day + dailyWeatherObj.feels_like.night + dailyWeatherObj.feels_like.eve + dailyWeatherObj.feels_like.morn) / 4;

				return (
					<Fragment>
						<Col>
							<h3>Thessaloniki</h3>
							<p>
								Temperature: ~{Math.round(avgTemp)}°C
								<br />
								<span className='small'>Feels like: ~{Math.round(avgFeelsLike)}°C</span>
							</p>
						</Col>
						<Col className='small'>
							<Container className='rounded pt-1 pb-1 semi-dark-bg'>
								<p className='m-0'>
									Wind: ~{Math.round(msToKmh(dailyWeatherObj.wind_speed))} km/h
									
									<OverlayTrigger overlay={windDegreesOverlay(dailyWeatherObj.wind_deg)}>
										<span> <ArrowUp style={{ transform: `rotate(${dailyWeatherObj.wind_deg}deg)` }} /></span>
									</OverlayTrigger>
									
									<br />
									Humidity: ~{Math.round(dailyWeatherObj.humidity)}%
									<br />
									Pressure: ~{dailyWeatherObj.pressure} hPa
								</p>
							</Container>
						</Col>
					</Fragment>
				);
			}
		};

		return (
			<Container className='weather-container py-3'>
				<Row xs='auto'>
					<Col xs='auto'>
						<Image src={weatherIcon} alt={weatherIconAltText} />
					</Col>
					{getWeatherInfo()}
					<Col xs='auto'>
						<DayPicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} dayToday={dayToday} />
					</Col>
					<Col xs='auto' xl='5' className='m-0'>
						<MaxTempChart weatherRes={weatherRes} dayToday={dayToday} />
					</Col>
				</Row>
			</Container>
		);
	}

	else return (
		<Container className='weather-container text-center'>
			<Spinner animation='border' />
		</Container>
	);
};

export default WeatherWidget;