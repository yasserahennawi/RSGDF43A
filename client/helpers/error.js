export function getErrorMessage(error) {
  return error.getError().source.errors[0].message;
}

export function isValidationError(error) {
  return error.getError().source.errors[0].name === 'ValidationError';
}

export function isForbiddenError(error) {
  return error.getError().source.errors[0].name === 'ForbiddenError';
}

export function isUnauthorizedError(error) {
  return error.getError().source.errors[0].name === 'UnauthorizedError';
}

export function isModelNotFoundError(error) {
  return error.getError().source.errors[0].name === 'ModelNotFoundError';
}

export function isUnkownError(error) {
  return error.getError().source.errors[0].name === 'UnkownError';
}

/**
 * This will return an array of validation messages in this format
 *
 * { key: string, value: string }
 */
export function getErrorValidationMessages(error) {
  return error.getError().source.errors[0].validationMessages || [];
}

export function checkErrorValidationKey(error, key) {
  return getErrorValidationMessages(error)
    .some(validationMessage => validationMessage.key === key);
}

export function getErrorValidationMessage(error, key) {
  const validationMessage = getErrorValidationMessages(error)
    .find(validationMessage => validationMessage.key === key);
  return validationMessage ? validationMessage.value : '';
}

export function getErrorValidationObject(error) {
  const validationMessages = getErrorValidationMessages(error);
  const object = {};
  for(let validationMessage of validationMessages) {
    object[ validationMessage.key ] = validationMessage.value;
  }
  return object;
}
