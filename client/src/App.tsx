import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './lib/history';
import { Login, Profile, NavBar } from './sections';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
