import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LogPage from './containers/LogPage';

export default () => (
  <App>
    <Switch>
      {/*<Route path={routes.LOG} component={LogPage} />
      <Route path={routes.HOME} component={HomePage} />*/}
      <Route path={routes.HOME} component={LogPage} />
    </Switch>
  </App>
);
