import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../_actions/auth';
import PropTypes from 'prop-types';

const ConfirmLogoutModal = ({ logout }) => {
	return (
		<div className='modal fade' id='confirmLogoutModal'>
			<div
				className='modal-dialog modal-dialog-centered modal-sm'
				role='document'
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Confirm logout</h5>
					</div>
					<div className='modal-body'>Are you sure you wanna logout?</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary btn-sm'
							data-dismiss='modal'
						>
							Cancel
						</button>
						<button
							type='button'
							className='btn btn-secondary btn-sm btn-danger'
							data-dismiss='modal'
							onClick={logout}
						>
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

ConfirmLogoutModal.propTypes = {
	logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(ConfirmLogoutModal);
