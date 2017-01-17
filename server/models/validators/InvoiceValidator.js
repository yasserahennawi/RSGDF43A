import Validator from './Validator';
import IoC from 'AppIoC';

export default class InvoiceValidator extends Validator {
  constructor() {
    super();
  }

  validate(invoice) {
    let promises = [
    ];

    return this.getErrors(promises);
  }
}

IoC.singleton('invoiceValidator', [], InvoiceValidator);
