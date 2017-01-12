export default class ErrorHandler {
  format(error) {
    if(error && error.toObject) {
      return error.toObject();
    }
    return error;
  }
}
