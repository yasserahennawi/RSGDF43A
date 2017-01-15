import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateInvoiceCommand {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.invoiceRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createInvoiceCommand', ['invoiceRepository'], CreateInvoiceCommand);
