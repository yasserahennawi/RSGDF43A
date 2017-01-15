import { Router } from 'express';
import IoC from 'AppIoC';

export const productRouter = (productController) => {
  const router = Router();

  router.get('/', productController.find.bind(productController));
  router.get('/:productId', productController.findById.bind(productController));
  router.post('/', productController.create.bind(productController));
  router.put('/:productId', productController.update.bind(productController));
  router.delete('/:productId', productController.remove.bind(productController));

  return router;
}

IoC.callable('productRouter', ['productController'], productRouter);
