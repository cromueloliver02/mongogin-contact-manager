import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT, SET_MODAL, REMOVE_MODAL } from './types';

export const setAlert = (msg, type, timeout) => dispatch => {
	const id = uuidv4();

	dispatch({
		type: SET_ALERT,
		payload: { msg, type, id }
	});

	setTimeout(
		() => dispatch({ type: REMOVE_ALERT, payload: id }),
		timeout || 2500
	);
};

export const setModal = (title, msg) => dispatch => {
	dispatch({
		type: SET_MODAL,
		payload: { title, msg }
	});
};

export const removeModal = () => dispatch => {
	dispatch({
		type: REMOVE_MODAL
	});
};
