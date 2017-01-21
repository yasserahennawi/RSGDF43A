import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {
  getErrorValidationMessages
} from 'helpers/error';

export default ({ error, onDismiss }) => (
  <Snackbar
    open={!!error}
    message={error ? getErrorValidationMessages(error).map(({ value }) => value) + "<br />" : null}
    action="OK"
    autoHideDuration={7000}
    onActionTouchTap={onDismiss}
    onRequestClose={onDismiss}
  />
);
