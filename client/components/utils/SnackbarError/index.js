import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {
  getErrorMessage
} from 'helpers/error';

export default ({ error, onDismiss }) => (
  <Snackbar
    open={!!error}
    message={getErrorMessage(error) || error || ''}
    action="Dismiss"
    autoHideDuration={7000}
    onActionTouchTap={onDismiss}
    onRequestClose={onDismiss}
  />
);
