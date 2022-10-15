import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getFutureDayName } from '../../modules/common';

const DayPicker = ({selectedDay, setSelectedDay, dayToday}) => {

	return (
		<ToggleButtonGroup vertical size='sm' name='dayBtns' className='rounded semi-dark-bg'
			value={selectedDay}
		>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={0}
				onClick={() => setSelectedDay(0)}
			>
				Today
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={1}
				onClick={() => setSelectedDay(1)}
			>
				{getFutureDayName(dayToday, 1)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={2}
				onClick={() => setSelectedDay(2)}
			>
				{getFutureDayName(dayToday, 2)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={3}
				onClick={() => setSelectedDay(3)}
			>
				{getFutureDayName(dayToday, 3)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={4}
				onClick={() => setSelectedDay(4)}
			>
				{getFutureDayName(dayToday, 4)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={5}
				onClick={() => setSelectedDay(5)}
			>
				{getFutureDayName(dayToday, 5)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={6}
				onClick={() => setSelectedDay(6)}
			>
				{getFutureDayName(dayToday, 6)}
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={7}
				onClick={() => setSelectedDay(7)}
			>
				{getFutureDayName(dayToday, 7)}
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

DayPicker.propTypes = {
	selectedDay: PropTypes.number.isRequired,
	setSelectedDay: PropTypes.func.isRequired,
	dayToday: PropTypes.number.isRequired,
};

export default DayPicker;