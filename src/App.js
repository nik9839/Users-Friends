import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components'
import Users from './modules/users'
import Friends from './modules/friends'

export default function App() {

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/user/:userId/:type" component={Friends} />
          <Redirect to="/users" />
        </Switch>
      </Layout>
    </Router>

  );
}