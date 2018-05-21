import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import Canvass from '../components/Canvass';
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import PageNotFound from "../components/PageNotFound";

import PrivateRoute from "./PrivateRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <PrivateRoute path="/" exact={true} component={Dashboard} />
        <Route path="/c/:canvassId?/" component={Canvass} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;