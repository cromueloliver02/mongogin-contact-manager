import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../_actions/auth';
import PropTypes from 'prop-types';

const Login = ({ isAuthenticated, login }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onLogin = e => {
		login(email, password);

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
						<h3 className='text-center mb-4'>SIGN IN</h3>
						<form>
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
							<button
								type='submit'
								className='btn btn-dark btn-block btn-sm'
								onClick={onLogin}
							>
								LOGIN
							</button>
						</form>
						<p className='mt-4'>
							No account yet? <Link to='/register'>Sign up</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
