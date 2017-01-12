export default function UnkownError(messages) {
  this.name = 'UnkownError';
  this.message = "A validation error has occured";
  this.stack = (new Error()).stack;

  this.toObject = () => ({
    message: this.message,
    name: this.name,
    stack: this.stack,
  });
}
UnkownError.prototype = Object.create(Error.prototype);
UnkownError.prototype.constructor = UnkownError;
