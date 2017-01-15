import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RemoveInvoiceCommand {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer, invoiceId) {
    return await this.invoiceRepository.remove(viewer, invoiceId);
  }
}

IoC.singleton('removeInvoiceCommand', ['invoiceRepository'], RemoveInvoiceCommand);
