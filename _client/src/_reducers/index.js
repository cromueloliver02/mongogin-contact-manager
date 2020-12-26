import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import contactReducer from './contact';

export default combineReducers({
	alert: alertReducer,
	auth: authReducer,
	contact: contactReducer
});
