import React, { Fragment } from 'react';
import { Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
		<Fragment>
			<Col>
				<h3>Thessaloniki</h3>
				<p>
					Temperature: {avgPrefix}{Math.round(temp)}°C
					<br />
					<span className='small'>Feels like: {avgPrefix}{Math.round(feelsLike)}°C</span>
				</p>
			</Col>
			<Col className='small'>
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
		</Fragment>
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