import axios from 'axios';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	UPDATE_CONTACT,
	CLEAR_CONTACTS,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	SET_CURRENT,
	CLEAR_CURRENT,
	SET_LOADING,
	CONTACT_ERROR
} from '../_actions/types';
import { setAlert } from '../_actions/alert';

export const getContacts = () => async dispatch => {
	dispatch(setLoading());

	try {
		const res = await axios.get('/api/contacts');

		dispatch({
			type: GET_CONTACTS,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.message);
	}
};

export const addContact = formData => async dispatch => {
	dispatch(setLoading());

	try {
		const body = {
			...formData
		};

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/contacts', body, config);

		dispatch({
			type: ADD_CONTACT,
			payload: res.data.data
		});

		dispatch(setAlert('Contact added', 'success'));
	} catch (err) {
		console.error(err.message);

		dispatch(setAlert(err.response.data.msg, 'danger'));

		dispatch({
			type: CONTACT_ERROR,
			payload: err.response.data
		});
	}
};

export const deleteContact = id => async dispatch => {
	dispatch(setLoading());

	try {
		const res = await axios.delete(`/api/contacts/${id}`);

		dispatch({
			type: DELETE_CONTACT,
			payload: id
		});

		if (res.data.success) {
			dispatch(setAlert(res.data.msg, 'success'));
		}
	} catch (err) {
		console.error(err.message);
		dispatch(setAlert(err.response.data.msg, 'danger'));

		dispatch({
			type: CONTACT_ERROR,
			payload: err.response.data
		});
	}
};

export const updateContact = formData => async dispatch => {
	dispatch(setLoading());

	try {
		const body = {
			...formData
		};

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const res = await axios.put(`/api/contacts/${formData.id}`, body, config);

		dispatch({
			type: UPDATE_CONTACT,
			payload: res.data.data
		});

		dispatch({
			type: CLEAR_CURRENT
		});

		dispatch(setAlert('Contact updated', 'success'));
	} catch (err) {
		console.error(err.message);
		dispatch(setAlert(err.response.data.msg, 'danger'));

		dispatch({
			type: CONTACT_ERROR,
			payload: err.response.data
		});
	}
};

export const clearContacts = () => dispatch => {
	dispatch({
		type: CLEAR_CONTACTS
	});
};

export const filterContacts = text => dispatch => {
	dispatch({
		type: FILTER_CONTACTS,
		payload: text
	});
};

export const clearFilter = text => dispatch => {
	dispatch({
		type: CLEAR_FILTER
	});
};

export const setCurrent = contact => dispatch => {
	dispatch({
		type: SET_CURRENT,
		payload: contact
	});
};

export const clearCurrent = () => dispatch => {
	dispatch({
		type: CLEAR_CURRENT
	});
};

const setLoading = () => dispatch => {
	dispatch({
		type: SET_LOADING
	});
};
