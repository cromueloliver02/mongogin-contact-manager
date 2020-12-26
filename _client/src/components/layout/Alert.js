import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alert }) =>
	alert.length > 0 && (
		<div
			className={`custom-alert custom-alert-${alert[0].type} ${
				alert.length > 0 ? 'active' : ''
			}`}
		>
			<i className='fas fa-info-circle'></i> {alert[0].msg}
		</div>
	);

Alert.propTypes = {
	alert: PropTypes.array
};

const mapStateToProps = state => ({
	alert: state.alert.alert
});

export default connect(mapStateToProps)(Alert);
