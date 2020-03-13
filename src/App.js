import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Users } from './components/Users';
import { Products } from './components/Products';
import { Budget } from './components/Budget';
import { Layout } from './components/Layout';


function App() {
  return (
    <React.Fragment>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Users} />
            <Route path="/users" component={Users} />
            <Route path="/products" component={Products} />
            <Route path="/budget" component={Budget} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
