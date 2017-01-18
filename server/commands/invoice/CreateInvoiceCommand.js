import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class CreateInvoiceCommand {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer, attrs) {
    return await this.invoiceRepository.create(viewer, attrs);
  }
}

IoC.singleton('createInvoiceCommand', ['invoiceRepository'], CreateInvoiceCommand);
