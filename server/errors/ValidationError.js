export default function ValidationError(messages) {
  this.name = 'ValidationError';
  this.message = "A validation error has occured";
  this.stack = (new Error()).stack;

  this.getMessages = () => messages;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
