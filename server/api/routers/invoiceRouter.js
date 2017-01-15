import { Router } from 'express';
import IoC from 'AppIoC';

export const invoiceRouter = (invoiceController) => {
  const router = Router();

  router.get('/', invoiceController.find.bind(invoiceController));
  router.get('/:invoiceId', invoiceController.findById.bind(invoiceController));
  router.post('/', invoiceController.create.bind(invoiceController));
  router.put('/:invoiceId', invoiceController.update.bind(invoiceController));
  router.delete('/:invoiceId', invoiceController.remove.bind(invoiceController));

  return router;
}

IoC.callable('invoiceRouter', ['invoiceController'], invoiceRouter);
