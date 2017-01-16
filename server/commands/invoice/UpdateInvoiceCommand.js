import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateInvoiceCommand {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(viewer, invoiceId, attrs) {
    return await this.invoiceRepository.update(viewer, invoiceId, attrs);
  }
}

IoC.singleton('updateInvoiceCommand', ['invoiceRepository'], UpdateInvoiceCommand);
