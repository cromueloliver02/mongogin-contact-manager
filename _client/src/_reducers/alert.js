import {
	SET_ALERT,
	REMOVE_ALERT,
	SET_MODAL,
	REMOVE_MODAL
} from '../_actions/types';

const initialState = {
	alert: [],
	modal: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ALERT:
			return {
				...state,
				alert: [...state.alert, payload]
			};
		case REMOVE_ALERT:
			return {
				...state,
				alert: state.alert.filter(item => item.id !== payload)
			};
		case SET_MODAL:
			return {
				...state,
				modal: payload
			};
		case REMOVE_MODAL:
			return {
				...state,
				modal: null
			};
		default:
			return state;
	}
};
