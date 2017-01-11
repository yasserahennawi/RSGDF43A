export default function ModelNotFoundError(message) {
  this.name = 'ModelNotFoundError';
  this.message = message || "Model not found";
  this.stack = (new Error()).stack;
}
ModelNotFoundError.prototype = Object.create(Error.prototype);
ModelNotFoundError.prototype.constructor = ModelNotFoundError;
