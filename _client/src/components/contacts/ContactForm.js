import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	addContact,
	updateContact,
	clearCurrent
} from '../../_actions/contact';
import { setAlert } from '../../_actions/alert';
import PropTypes from 'prop-types';

const ContactForm = ({
	current,
	addContact,
	updateContact,
	clearCurrent,
	setAlert
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		type: 'personal'
	});
	const { name, email, phone, address, type } = formData;

	useEffect(() => {
		if (current) {
			setFormData({
				name: current.name ? current.name : '',
				email: current.email ? current.email : '',
				phone: current.phone ? current.phone : '',
				address: current.address ? current.address : '',
				type: current.type ? current.type : ''
			});
		} else {
			setFormData({
				name: '',
				email: '',
				phone: '',
				address: '',
				type: 'personal'
			});
		}
	}, [current]);

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		if (name === '' || email === '' || phone === '' || type === '') {
			setAlert('Please enter all required information', 'danger');
		} else {
			const contactFields = {};
			if (current) contactFields.id = current._id;
			if (name) contactFields.name = name;
			if (email) contactFields.email = email;
			if (phone) contactFields.phone = phone;
			if (address) contactFields.address = address;
			if (type) contactFields.type = type;

			if (current) {
				updateContact(contactFields);
			} else {
				addContact(contactFields);
			}

			setFormData({
				name: '',
				email: '',
				phone: '',
				address: '',
				type: 'personal'
			});
		}

		e.preventDefault();
	};

	const onCancel = () => {
		setFormData({
			name: '',
			email: '',
			phone: '',
			address: '',
			type: 'personal'
		});

		clearCurrent();
	};

	return (
		<Fragment>
			{!current ? (
				<h4 className='mb-3'>
					<span className='text-primary'>ADD</span> CONTACT
				</h4>
			) : (
				<h4 className='mb-3'>
					<span className='text-info'>EDIT</span> CONTACT
				</h4>
			)}

			<form>
				<div className='form-group'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>
								<i className='fas fa-user'></i>
							</span>
						</div>
						<input
							type='text'
							className='form-control'
							placeholder='Name...'
							name='name'
							value={name}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className='form-group'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>
								<i className='fas fa-envelope'></i>
							</span>
						</div>
						<input
							type='email'
							className='form-control'
							placeholder='Email...'
							name='email'
							value={email}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className='form-group'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>
								<i className='fas fa-phone-alt'></i>
							</span>
						</div>
						<input
							type='text'
							className='form-control'
							placeholder='Phone number...'
							name='phone'
							value={phone}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className='form-group'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>
								<i className='fas fa-map-marker-alt'></i>
							</span>
						</div>
						<input
							type='text'
							className='form-control'
							placeholder='Address...'
							name='address'
							value={address}
							onChange={onChange}
						/>
					</div>
				</div>
				<div className='form-group d-flex justify-content-around'>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='type'
							value='personal'
							onChange={onChange}
							checked={type === 'personal'}
						/>
						<label className='form-check-label' htmlFor='type'>
							Personal
						</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='type'
							value='professional'
							onChange={onChange}
							checked={type === 'professional'}
						/>
						<label className='form-check-label' htmlFor='type'>
							Professional
						</label>
					</div>
				</div>
				<button
					type='submit'
					className={`btn ${
						!current ? 'btn-primary' : 'btn btn-info'
					} btn-block btn-sm mb-1`}
					onClick={onSubmit}
				>
					{!current ? (
						<Fragment>
							<i className='fas fa-plus'></i> ADD
						</Fragment>
					) : (
						<Fragment>
							<i className='fas fa-pencil-alt'></i> UPDATE
						</Fragment>
					)}
				</button>
			</form>
			{current && (
				<button
					className='btn btn-danger btn-block btn-sm'
					onClick={onCancel}
				>
					CANCEL
				</button>
			)}
		</Fragment>
	);
};

ContactForm.addContact = {
	addContact: PropTypes.func.isRequired,
	updateContact: PropTypes.func.isRequired,
	clearCurrent: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	current: PropTypes.object
};

const mapStateToProps = state => ({
	current: state.contact.current
});

export default connect(mapStateToProps, {
	addContact,
	updateContact,
	clearCurrent,
	setAlert
})(ContactForm);
