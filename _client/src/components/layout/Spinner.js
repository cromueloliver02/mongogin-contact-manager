import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
	<img
		src={spinner}
		alt='Loading...'
		className='img-fluid'
		style={{ display: 'block', margin: 'auto', width: '70px' }}
	/>
);
export default Spinner;
