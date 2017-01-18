import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class InvoiceSeederCommand {

  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }
  }
}

IoC.singleton('invoiceSeederCommand', ['invoiceRepository'], InvoiceSeederCommand);
