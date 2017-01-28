import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  getErrorMessage,
  getErrorValidationMessages,
  isValidationError,
  isForbiddenError,
  isUnauthorizedError,
  isModelNotFoundError,
  isUnknownError,
} from 'helpers/error';

const ValidationError = ({ error }) => (
  <div>
    <ul>
      {getErrorValidationMessages(error).map((validation, index) => (
        <li key={index}><b>{validation.key}:</b> { validation.value }</li>
      ))}
    </ul>
  </div>
);

const ForbiddenError = ({ error }) => (
  <p>
    Please make sure that you have the correct permissions to do this action
  </p>
);

const UnauthorizedError = ({ error }) => (
  <p>
    Please make sure that you have the correct permissions to do this action
  </p>
);

const ModelNotFoundError = ({ error }) => (
  <p>
    We cant find the data you are looking for
  </p>
);

const UnknownError = ({ error }) => (
  <p>
  </p>
);


export default ({ error, onDismiss }) => (
  <Dialog
    title={getErrorMessage(error) || "Unkown error!"}
    actions={[
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={onDismiss}
      />,
    ]}
    modal={false}
    open={!!error}
    onRequestClose={onDismiss}
  >
   {isValidationError(error) ? <ValidationError error={error} /> : null}
   {isForbiddenError(error) ? <ForbiddenError error={error} /> : null}
   {isUnauthorizedError(error) ? <UnauthorizedError error={error} /> : null}
   {isModelNotFoundError(error) ? <ModelNotFoundError error={error} /> : null}
   {isUnknownError(error) ? <UnknownError error={error} /> : null}
  </Dialog>
);
