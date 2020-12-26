import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NotFound = ({ isAuthenticated }) => {
	return (
		<section className='about'>
			<div className='container mt-resp-5'>
				<h3 className='text-center mb-4'>
					<strong>404</strong>: Page Not Found
				</h3>
				<Link
					className='btn text-center d-block m-auto btn-notFound'
					to={`${isAuthenticated ? '/home' : '/'}`}
				>
					Go back
				</Link>
			</div>
		</section>
	);
};

NotFound.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(NotFound);
