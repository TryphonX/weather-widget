import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';

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

const MaxTempChart = ({weatherRes}) => {

	const maxTemps = weatherRes.daily.map(dailyObj => Math.round(dailyObj.temp.max));
		
	const maxTempsData = {
		labels: ['Today', 'Tomorrow', 'In 2 days', 'In 3 days', 'In 4 days', 'In 5 days', 'In 6 days', 'In 7 days'],
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
};

export default MaxTempChart;