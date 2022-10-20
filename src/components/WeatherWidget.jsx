import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import '../css/weatherWidget.css';
import DayPicker from './WeatherWidget/DayPicker';
import MaxTempChart from './WeatherWidget/MaxTempChart';
import WeatherInfo from './WeatherWidget/WeatherInfo';



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


	if (weatherRes && weatherIconAltText) {

		const getWeatherInfo = () => {

			if (selectedDay === 0) {

				return(
					<WeatherInfo
						temp={weatherRes.current.temp}
						feelsLike={weatherRes.current.feels_like}
						windSpeed={weatherRes.current.wind_speed}
						windDeg={weatherRes.current.wind_deg}
						humidity={weatherRes.current.humidity}
						pressure={weatherRes.current.pressure}
					/>
				);
			}

			else {
				const dailyWeatherObj = weatherRes.daily[selectedDay];

				const avgTemp = (dailyWeatherObj.temp.day + dailyWeatherObj.temp.night + dailyWeatherObj.temp.eve + dailyWeatherObj.temp.morn) / 4;
				const avgFeelsLike = (dailyWeatherObj.feels_like.day + dailyWeatherObj.feels_like.night + dailyWeatherObj.feels_like.eve + dailyWeatherObj.feels_like.morn) / 4;

				return (
					<WeatherInfo isAvg
						temp={avgTemp}
						feelsLike={avgFeelsLike}
						windSpeed={dailyWeatherObj.wind_speed}
						windDeg={dailyWeatherObj.wind_deg}
						humidity={dailyWeatherObj.humidity}
						pressure={dailyWeatherObj.pressure}
					/>
				);
			}
		};

		return (
			<Container className='weather-container py-3'>
				<Row>
					<Col xs='auto'>
						<Image src={weatherIcon} alt={weatherIconAltText} />
					</Col>
					<Col xs='12' md='7' lg='5' xl='4'>
						{getWeatherInfo()}
					</Col>
					<Col xs='auto'>
						<DayPicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} dayToday={dayToday} />
					</Col>
					<Col xs='auto' lg='12' xl='5' className='m-0'>
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