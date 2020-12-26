import React from 'react';
import { connect } from 'react-redux';
import { deleteContact, setCurrent } from '../../_actions/contact';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, deleteContact, setCurrent }) => {
	const { _id, name, email, phone, address, type } = contact;

	return (
		<div className='card card-body mb-3'>
			<div className='d-flex justify-content-between align-items-center mb-2'>
				<strong>{name}</strong>
				<span
					className={`badge badge-pill badge-${
						type === 'personal' ? 'primary' : 'success'
					}`}
				>
					{type[0].toUpperCase() + type.slice(1)}
				</span>
			</div>

			<div className='d-flex justify-content-between align-items-center mb-2'>
				<span>{email}</span>
				<span>{address && address}</span>
			</div>

			<span className='mb-2'>{phone}</span>

			<div>
				<button
					className='btn btn-secondary btn-sm'
					onClick={() => setCurrent(contact)}
				>
					Edit
				</button>
				<button
					className='btn btn-danger btn-sm ml-1'
					onClick={() => deleteContact(_id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
	deleteContact: PropTypes.func.isRequired,
	setCurrent: PropTypes.func.isRequired
};

export default connect(null, { deleteContact, setCurrent })(ContactItem);
