import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateInvoiceCommand {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer, invoiceId, {
    name,
  }) {
    return await this.invoiceRepository.update(viewer, invoiceId, {
      name
    });
  }
}

IoC.singleton('updateInvoiceCommand', ['invoiceRepository'], UpdateInvoiceCommand);
