import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import RootQuery from './RootQuery';
import { prepareUserTokenParams } from './RootQuery';
import App from 'components/common/App';
import HomeRoute from 'components/routes/HomeRoute';
import HomeQuery from 'components/routes/HomeRoute/Query';

import CreateBloggerRoute from 'components/routes/CreateBloggerRoute';
import CreateBloggerQuery from 'components/routes/CreateBloggerRoute/Query';

export default (
  <Route
    path='/'
    component={App}
    queries={RootQuery}
    prepareParams={prepareUserTokenParams}>

    <IndexRoute
      component={HomeRoute}
      queries={HomeQuery} />

    <Route
      path='/create/blogger'
      component={CreateBloggerRoute}
      queries={CreateBloggerQuery} />

  </Route>
);

