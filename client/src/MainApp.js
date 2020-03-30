import React, { Component } from 'react';
import logo from './';
import './MainApp.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';

class MainApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">{/* <About /> */}</Route>
            <Route path="/dashboard">{/* <Dashboard /> */}</Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
