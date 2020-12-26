import React, { Fragment, useEffect } from 'react';
import ContactItem from '../contacts/ContactItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getContacts } from '../../_actions/contact';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Contacts = ({
	contact: { contacts, filtered, loading },
	getContacts
}) => {
	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts.length === 0 && loading) {
		return <Spinner />;
	}

	if (contacts.length === 0) {
		return (
			<p className='text-center text-muted contacts-text'>
				You have no contacts yet, add some now...
			</p>
		);
	}

	if (filtered && filtered.length === 0) {
		return (
			<p className='text-center text-muted contacts-text'>
				No contacts found...
			</p>
		);
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.length > 0 &&
					  filtered.map(contact => (
							<CSSTransition
								key={contact._id}
								timeout={500}
								classNames='item'
							>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map(contact => (
							<CSSTransition
								key={contact._id}
								timeout={500}
								classNames='item'
							>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	);
};

Contacts.propTypes = {
	getContacts: PropTypes.func.isRequired,
	contact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	contact: state.contact
});

export default connect(mapStateToProps, { getContacts })(Contacts);
