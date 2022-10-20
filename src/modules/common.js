const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

/**
 * Get the name of the day `plusDays` days ahead.
 * @param currentDay The number of today's day.
 * @param plusDays How many days ahead. 
 */
export const getFutureDayName = (currentDay, plusDays) => {

	if (currentDay > 6) return 'Invalid Day.';
	else if (plusDays > 6) return getFutureDayName(currentDay, plusDays - 7);
	else return DAYS[currentDay + plusDays] ?? DAYS[currentDay + plusDays - 7];
};

/**
 * Converts m/s to km/h.
 * @param ms The value in m/s
 * @returns kmh value
 */
export const msToKmh = (ms) => ms * 3.6;