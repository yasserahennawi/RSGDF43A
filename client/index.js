import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';
import Route from './routes/Route';
import { getUserToken } from 'helpers/storage';
import { setConfig as setUploaderConfig } from 'helpers/uploader';

import 'themes/main.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      Authorization: `JWT ${getUserToken()}`,
    },
  })
);

setUploaderConfig({
  bucket: 'tastetastic',
  endpoint: process.env.IMAGE_MIDDLEWARE_ENDPOINT,
});

console.log(process.env.IMAGE_MIDDLEWARE_ENDPOINT);

ReactDOM.render(
  <Router history={browserHistory} routes={Route} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />,
  rootNode
);
