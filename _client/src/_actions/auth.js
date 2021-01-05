import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { clearContacts } from './contact';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	SET_LOADING_AUTH
} from './types';

export const loadUser = () => async dispatch => {
	if (localStorage.getItem('token')) {
		setAuthToken(localStorage.getItem('token'));
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data.user
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

export const register = (name, email, password, history) => async dispatch => {
	dispatch(setLoading());

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = {
		name,
		email,
		password
	};
	try {
		const res = await axios.post('/api/user', body, config);

		dispatch({ type: REGISTER_SUCCESS });

		dispatch(setAlert('Registered successfully', 'success'));

		if (res.data.success) {
			history.push('/login');
		}
	} catch (err) {
		if (err.response.data.errors !== undefined) {
			dispatch(setAlert(err.response.data.errors[0].msg, 'danger'));
		}

		if (err.response.data.msg) {
			dispatch(setAlert(err.response.data.msg, 'danger'));
		}

		dispatch({ type: REGISTER_FAIL });
	}
};

export const login = (email, password) => async dispatch => {
	dispatch(setLoading());

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = {
		email,
		password
	};

	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: LOGIN_FAIL });

		if (err.response.data.errors !== undefined) {
			return dispatch(setAlert(err.response.data.errors[0].msg, 'danger'));
		}

		if (err.response.data.msg !== null) {
			dispatch(setAlert(err.response.data.msg, 'danger'));
		}
	}
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });

	dispatch(clearContacts());
};

const setLoading = () => dispatch => {
	dispatch({ type: SET_LOADING_AUTH });
};
