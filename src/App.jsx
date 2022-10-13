import React from 'react';
import { Container } from 'react-bootstrap';
import WeatherWidget from './components/WeatherWidget';

const App = () => {
	return (
		<Container className='pt-5'>
			<WeatherWidget />
		</Container>
	);
};

export default App;
