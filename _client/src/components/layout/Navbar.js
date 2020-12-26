import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setModal } from '../../_actions/alert';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading } }) => {
	return (
		<nav className='navbar navbar-expand-sm navbar-light bg-light fixed-top py-2'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					<span className='primary-text'>
						<i className='fab fa-envira'></i> Mongo
					</span>
					Gin
				</Link>

				{!loading && isAuthenticated && (
					<Fragment>
						<button
							className='navbar-toggler'
							data-toggle='collapse'
							data-target='#navbar-menu'
						>
							<span className='navbar-toggler-icon'></span>
						</button>

						<div id='navbar-menu' className='navbar-collapse collapse'>
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item'>
									<Link to='/home' className='nav-link'>
										Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/about' className='nav-link'>
										About
									</Link>
								</li>
								<li className='nav-item'>
									<a
										href='#!'
										className='nav-link'
										data-toggle='modal'
										data-target='#confirmLogoutModal'
									>
										<i className='fas fa-sign-out-alt'></i> Logout
									</a>
								</li>
							</ul>
						</div>
					</Fragment>
				)}
			</div>
		</nav>

		// <nav className='navbar navbar-expand-sm bg-light'>
		// 	<div className='container'>
		// 		<Link to='/' className='navbar-brand'>
		// 			<i className='fab fa-envira logo-icon'></i>
		// 			<span className='text-main'>Mongo</span>Gin
		// 		</Link>
		// 		<button className='navbar-toggler'>
		// 			<span className='navbar-toggler-icons'></span>
		// 		</button>
		// 		{!loading && isAuthenticated && (
		// 			<div id='navbar-menu' className='navbar-collapse collapse'>
		// 				<ul className='navbar-nav'>
		// 					<li className='nav-item'>
		// 						<Link to='/dashboard' className='nav-link'>
		// 							Dashboard
		// 						</Link>
		// 						<Link to='/about' className='nav-link ml-3'>
		// 							About
		// 						</Link>
		// 						<a
		// 							href='#!'
		// 							onClick={onLogout}
		// 							className='nav-link ml-3'
		// 						>
		// 							<i className='fas fa-sign-out-alt'></i> Logout
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</div>
		// 		)}
		// 	</div>
		// </nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	setModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { setModal })(Navbar);
