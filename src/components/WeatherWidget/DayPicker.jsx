import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DayPicker = ({selectedDay, setSelectedDay}) => {

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
				Tomorrow
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={2}
				onClick={() => setSelectedDay(2)}
			>
				In 2 days
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={3}
				onClick={() => setSelectedDay(3)}
			>
				In 3 days
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={4}
				onClick={() => setSelectedDay(4)}
			>
				In 4 days
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={5}
				onClick={() => setSelectedDay(5)}
			>
				In 5 days
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={6}
				onClick={() => setSelectedDay(6)}
			>
				In 6 days
			</ToggleButton>
			<ToggleButton
				type='radio'
				variant='outline-light'
				value={7}
				onClick={() => setSelectedDay(7)}
			>
				In 7 days
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

DayPicker.propTypes = {
	selectedDay: PropTypes.number.isRequired,
	setSelectedDay: PropTypes.func.isRequired,
};

export default DayPicker;