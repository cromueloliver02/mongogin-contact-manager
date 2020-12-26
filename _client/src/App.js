import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import Alert from './components/layout/Alert';
import ConfirmLogoutModal from './components/layout/ConfirmLogoutModal';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './_actions/auth';

if (localStorage.getItem('token')) {
	setAuthToken(localStorage.getItem('token'));
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Alert />
					<Navbar />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute exact path='/home' component={Home} />
						<PrivateRoute exact path='/about' component={About} />
						<Route component={NotFound} />
					</Switch>
					<ConfirmLogoutModal />
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
