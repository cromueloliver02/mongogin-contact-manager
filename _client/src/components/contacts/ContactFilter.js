import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { filterContacts, clearFilter } from '../../_actions/contact';
import PropTypes from 'prop-types';

const ContactFilter = ({ filterContacts, clearFilter }) => {
	const text = useRef('');

	const onFilter = () => {
		filterContacts(text.current.value);

		if (text.current.value === '') {
			clearFilter();
		}
	};

	return (
		<div className='form-group mt-resp'>
			<div className='input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fas fa-filter'></i>
					</span>
				</div>
				<input
					type='text'
					className='form-control'
					placeholder='Filter contacts . . .'
					name='text'
					ref={text}
					onChange={onFilter}
				/>
			</div>
		</div>
	);
};

ContactFilter.propTypes = {
	filterContacts: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired
};

export default connect(null, { filterContacts, clearFilter })(ContactFilter);
