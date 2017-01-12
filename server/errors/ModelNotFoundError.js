export default function ModelNotFoundError(message) {
  this.name = 'ModelNotFoundError';
  this.message = message || "Model not found";
  this.stack = (new Error()).stack;

  this.toObject = () => ({
    message: this.message,
    name: this.name,
  });

}
ModelNotFoundError.prototype = Object.create(Error.prototype);
ModelNotFoundError.prototype.constructor = ModelNotFoundError;
