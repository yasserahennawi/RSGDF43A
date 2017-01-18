import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import App from 'components/common/App';

export default (
  <Route path='/' component={App} queries={ViewerQuery}>
  </Route>
);

