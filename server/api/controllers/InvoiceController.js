import Controller from './Controller';
import IoC from 'AppIoC';

export default class InvoiceController extends Controller {
  constructor(
    invoiceRepository,
    createInvoiceCommand,
    updateInvoiceCommand,
    removeInvoiceCommand,
    commandExecuter
  ) {
    super();
    this.invoiceRepository = invoiceRepository;
    this.createInvoiceCommand = createInvoiceCommand;
    this.updateInvoiceCommand = updateInvoiceCommand;
    this.removeInvoiceCommand = removeInvoiceCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.invoiceRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.invoiceRepository.findById(req.viewer, req.params.invoiceId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createInvoiceCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateInvoiceCommand, req.viewer, req.params.invoiceId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeInvoiceCommand, req.viewer, req.params.invoiceId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('invoiceController', [
  'invoiceRepository',
  'createInvoiceCommand',
  'updateInvoiceCommand',
  'removeInvoiceCommand',
  'commandExecuter',
], InvoiceController)
