import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../_actions/alert';
import { register } from '../../_actions/auth';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, setAlert, register, history }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		if (password !== password2) {
			setAlert(`Passwords doesn't match!`, 'danger');
			setFormData({ ...formData, password: '', password2: '' });
		} else {
			register(name, email, password, history);
		}

		e.preventDefault();
	};

	if (isAuthenticated) {
		return <Redirect to='/home' />;
	}

	return (
		<section className='login pt-5'>
			<div className='container pt-5 my-5'>
				<div className='row'>
					<div className='col-md-4 offset-md-4'>
						<h2 className='text-center mb-3'>
							<span className='primary-text'>
								<i className='fab fa-envira'></i> Mongo
							</span>
							Gin
						</h2>
						<h3 className='text-center mb-4'>SIGN UP</h3>
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
										type='text'
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
											<i className='fas fa-key'></i>
										</span>
									</div>
									<input
										type='password'
										className='form-control'
										placeholder='Password...'
										name='password'
										value={password}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className='form-group'>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-key'></i>
										</span>
									</div>
									<input
										type='password'
										className='form-control'
										placeholder='Confirm password...'
										name='password2'
										value={password2}
										onChange={onChange}
									/>
								</div>
							</div>
							<button
								type='submit'
								className='btn btn-dark btn-block btn-sm'
								onClick={onSubmit}
							>
								REGISTER
							</button>
						</form>
						<p className='mt-4'>
							Already have an account? <Link to='/login'>Sign in</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(
	withRouter(Register)
);
