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
	SET_LOADING
} from '../_actions/types';

const initialState = {
	contacts: [],
	current: null,
	filtered: null,
	loading: false,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: payload,
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [payload, ...state.contacts],
				loading: false
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(contact => contact._id !== payload),
				loading: false
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact._id === payload._id ? payload : contact
				),
				loading: false
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: []
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${payload}`, 'gi');

					return (
						contact.name.match(regex) ||
						contact.email.match(regex) ||
						contact.phone.match(regex)
					);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case SET_CURRENT:
			return {
				...state,
				current: payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
