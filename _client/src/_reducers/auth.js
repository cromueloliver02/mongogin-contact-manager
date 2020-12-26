import {
	// REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT
} from '../_actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	user: null,
	loading: true
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		// @todo		EDIT BACK TO ORIGINAL
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
			return {
				...state
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				// my custom code
				user: null
			};
		default:
			return state;
	}
};
