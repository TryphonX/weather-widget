import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';
import { getFutureDayName } from '../../modules/common';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
);

ChartJS.defaults.color = 'white';
ChartJS.defaults.font.size = 15;
ChartJS.defaults.font.family = 'Montserrat, sans-serif';

const MaxTempChart = ({weatherRes, dayToday}) => {

	const maxTemps = weatherRes.daily.map(dailyObj => Math.round(dailyObj.temp.max));
		
	const maxTempsData = {
		labels: ['Today', getFutureDayName(dayToday, 1), getFutureDayName(dayToday, 2), getFutureDayName(dayToday, 3), getFutureDayName(dayToday, 4), getFutureDayName(dayToday, 5), getFutureDayName(dayToday, 6), getFutureDayName(dayToday, 7)],
		datasets: [
			{
				label: 'Max Temperature',
				data: maxTemps,
				borderColor: 'orange',
				backgroundColor: 'orange',
			},
		],
	};

	const maxTempsOptions = {
		responsive: true,
		color: 'white',
		scales: {
			yAxes: {
				grid: {
					drawBorder: true,
					color: '#FFFFFF',
				},
				ticks:{
					beginAtZero: true,
					color: 'white',
				},
			},
			xAxes: {
				grid: {
					drawBorder: true,
					color: '#FFFFFF',
				},
				ticks:{
					beginAtZero: true,
					color: 'white',
				},
			},
		},
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Max Temperatures',
			},
		},
	};

	return (
		<Line className='rounded line-chart' options={maxTempsOptions} data={maxTempsData} />
	);
};

MaxTempChart.propTypes = {
	weatherRes: PropTypes.object.isRequired,
	dayToday: PropTypes.number.isRequired,
};

export default MaxTempChart;