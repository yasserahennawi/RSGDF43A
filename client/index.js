import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(
  <div></div>,
  rootNode
);
