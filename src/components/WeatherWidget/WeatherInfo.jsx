import React from 'react';
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';
import { msToKmh } from '../../modules/common';
import PropTypes from 'prop-types';

const WeatherInfo = ({temp, feelsLike, windSpeed, windDeg, humidity, pressure, isAvg = false}) => {

	const avgPrefix = isAvg ? '~' : '';

	const windDegreesOverlay = (degrees) => (
		<Tooltip>
			{avgPrefix}{degrees}°
		</Tooltip>
	);

	return(
		<Container fluid>
			<Row>
				<Col xs='12' md='6'>
					<h3>Thessaloniki</h3>
					<p>
						Temperature: {avgPrefix}{Math.round(temp)}°C
						<br />
						<span className='small'>Feels like: {avgPrefix}{Math.round(feelsLike)}°C</span>
					</p>
				</Col>
				<Col xs='12' md='6' className='small pb-3'>
					<Container className='rounded pt-1 pb-1 semi-dark-bg'>
						<p className='m-0'>
							Wind: {avgPrefix}{Math.round(msToKmh(windSpeed))} km/h 
						
							<OverlayTrigger overlay={windDegreesOverlay(windDeg)}>
								<span> <ArrowUp style={{ transform: `rotate(${windDeg}deg)` }} /></span>
							</OverlayTrigger>
									
							<br />
							Humidity: {avgPrefix}{Math.round(humidity)}%
							<br />
							Pressure: {avgPrefix}{pressure} hPa
						</p>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

WeatherInfo.propTypes = {
	temp: PropTypes.number.isRequired,
	feelsLike: PropTypes.number.isRequired,
	windSpeed: PropTypes.number.isRequired,
	windDeg: PropTypes.number.isRequired,
	humidity: PropTypes.number.isRequired,
	pressure: PropTypes.number.isRequired,
	isAvg: PropTypes.bool,
};

export default WeatherInfo;