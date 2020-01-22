import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './lib/history';
import { Login, Profile, NavBar, PrivateRoute } from './sections';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
