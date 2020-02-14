import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Project, LogIn, AppSider } from './sections';
import { Affix, Layout, Spin } from 'antd';
import { LOG_IN } from './lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { Viewer } from './lib/types';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/api',
  request: async (operation) => {
    const token = sessionStorage.getItem('token');
    operation.setContext({
      headers: {
        'X-CSRF-TOKEN': token || ''
      }
    });
  }
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  projects: [],
  didRequest: false
};

const App: React.FC = () => {
  const [viewer, setViewer] = useState(initialViewer);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching TradRack..." />
        </div>
      </Layout>
    );
  }

  return (
    <div className="App">
      <Router>
        <Layout id="app" className="app-layout">
          <AppSider viewer={viewer} setViewer={setViewer} />
          <Switch>
            <Route path="/" exact component={() => <h1>Home</h1>} />
            <Route exact path="/login">
              <LogIn setViewer={setViewer} />
            </Route>
            <Route exact path="/user/:id" component={() => <h2>user</h2>} />
            <Route exact path="/project/:id">
              <Project viewer={viewer} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
