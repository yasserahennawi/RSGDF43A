import validator from 'validator';

export function applyValidation(value, validation) {
  const validationType = validation === "object" ? validation.type : validation;
}

export function getErrorMessage(value, validations) {
  for(let validation of validations) {
    const result = applyValidation(value, validation);
    if(result) {
      return result;
    }
  }
}
