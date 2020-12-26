import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/home' />;
	}

	return (
		<section className='landing'>
			<div className='container'>
				<h1 className='mb-4'>
					<span className='primary-text'>
						<i className='fab fa-envira'></i> Mongo
					</span>
					Gin
				</h1>
				<p className='lead text-center mb-4'>
					Welcome to MongoGin! A contact management app.
				</p>
				<div>
					<Link to='/login' className='btn btn-light btn-sm'>
						Sign In
					</Link>
					<Link to='/register' className='btn btn-dark btn-sm ml-3'>
						Sign Up
					</Link>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
