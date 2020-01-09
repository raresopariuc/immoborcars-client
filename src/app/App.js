import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import MainPage from './MainPage';

import HouseList from '../house/HouseList';
import House from '../house/House';
import NewHouse from '../house/NewHouse';
import EditHouse from '../house/EditHouse';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import Apartment from "../apartment/Apartment";
import Car from "../car/Car";
import EditApartment from "../apartment/EditApartment";
import EditCar from "../car/EditCar";
import NewApartment from "../apartment/NewApartment";
import NewCar from "../car/NewCar";
import ApartmentList from "../apartment/ApartmentList";
import CarList from "../car/CarList";
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'immoborcars',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'immoborcars',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                {/*<Route exact path="/"*/}
                {/*       render={(props) => <MainPage isAuthenticated={this.state.isAuthenticated}*/}
                {/*                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>*/}
                {/*</Route>*/}

                <Route exact path="/"
                       render={(props) => <HouseList isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route exact path="/apartments"
                       render={(props) => <ApartmentList isAuthenticated={this.state.isAuthenticated}
                                                     currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route exact path="/cars"
                       render={(props) => <CarList isAuthenticated={this.state.isAuthenticated}
                                                     currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route path="/login"
                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}>
                </Route>

                <Route path="/signup" component={Signup}>
                </Route>

                <Route path="/users/:username"
                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/houses/edit/:id" component={EditHouse} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/apartments/edit/:id" component={EditApartment} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/cars/edit/:id" component={EditCar} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <Route path="/houses/:id"
                       render={(props) => <House authenticated={this.state.isAuthenticated} {...props} />}>
                </Route>

                <Route path="/apartments/:id"
                       render={(props) => <Apartment authenticated={this.state.isAuthenticated} {...props} />}>
                </Route>

                <Route path="/cars/:id"
                       render={(props) => <Car authenticated={this.state.isAuthenticated} {...props} />}>
                </Route>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/house/new" component={NewHouse} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/apartment/new" component={NewApartment} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/car/new" component={NewCar} handleLogout={this.handleLogout}>
                </PrivateRoute>

                <Route component={NotFound}>
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
