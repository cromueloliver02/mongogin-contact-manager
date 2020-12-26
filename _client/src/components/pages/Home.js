import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import Contacts from '../contacts/Contacts';

const Home = ({ user }) => {
	return (
		<section className='home pt-5'>
			<div className='container pt-5'>
				{user && (
					<p className='mb-4'>
						Hi {user.name}! Welcome to your contact manager.
					</p>
				)}
				<div className='row'>
					<div className='col-md-6'>
						<ContactForm />
					</div>
					<div className='col-md-6'>
						<ContactFilter />
						<Contacts />
					</div>
				</div>
			</div>
		</section>
	);
};

Home.propTypes = {
	user: PropTypes.object
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Home);
