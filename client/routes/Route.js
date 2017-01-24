import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import NotFound from 'components/common/NotFound';
import Loading from 'components/common/Loading';
import App from 'components/common/App';
import AppQuery from 'components/common/App/Query';
import HomeRoute from 'components/routes/HomeRoute';
import HomeQuery from 'components/routes/HomeRoute/Query';

import ListBloggersRoute from 'components/routes/ListBloggersRoute';
import ListBloggersQuery, { prepareBloggersRouteParams } from 'components/routes/ListBloggersRoute/Query';

import CreateBloggerRoute from 'components/routes/CreateBloggerRoute';
import CreateBloggerQuery from 'components/routes/CreateBloggerRoute/Query';

import EditBloggerDetailsRoute from 'components/routes/EditBloggerDetailsRoute';
import EditBloggerDetailsQuery from 'components/routes/EditBloggerDetailsRoute/Query';

import EditProductRoute from 'components/routes/EditProductRoute/test';
import EditProductQuery, { prepareEditProductParams } from 'components/routes/EditProductRoute/Query';

import EditRecipeRoute from 'components/routes/EditRecipeRoute';
import EditRecipeQuery from 'components/routes/EditRecipeRoute/Query';

export default (
  <Route
    path='/'
    component={App}
    queries={AppQuery}>

    <IndexRoute
      component={HomeRoute}
      queries={HomeQuery}/>

    <Route
      name="Neues Special"
      path="/books">
      <Route
        name="Erstellen"
        path="(:productId)"
        component={EditProductRoute}
        queries={EditProductQuery}
        prepareParams={prepareEditProductParams} />
      <Route
        name="Rezepte kreieren"
        path=":productId/recipe(/:recipeId)"
        component={EditRecipeRoute}
        queries={EditRecipeQuery} />
    </Route>


    <Route
      name="Mitglieder"
      path="/members">
      <IndexRoute
        component={ListBloggersRoute}
        queries={ListBloggersQuery}
        prepareParams={prepareBloggersRouteParams} />

      <Route
        name="Neue Mitglieder"
        path='new'
        component={CreateBloggerRoute}
        queries={CreateBloggerQuery} />

      <Route
        name="kontoverwaltung"
        path='edit/:userId'
        component={EditBloggerDetailsRoute}
        queries={EditBloggerDetailsQuery}
        render={({ props }) => props ? <EditBloggerDetailsRoute {...props} /> : <div></div>} />
    </Route>


    <Route
      name="Not found"
      path='*'
      component={NotFound} />

  </Route>
);

