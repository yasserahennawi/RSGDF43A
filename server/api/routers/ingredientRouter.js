import { Router } from 'express';
import IoC from 'AppIoC';

export const ingredientRouter = (ingredientController) => {
  const router = Router();

  router.get('/', ingredientController.find.bind(ingredientController));
  router.get('/:ingredientId', ingredientController.findById.bind(ingredientController));
  router.post('/', ingredientController.create.bind(ingredientController));
  router.put('/:ingredientId', ingredientController.update.bind(ingredientController));
  router.delete('/:ingredientId', ingredientController.remove.bind(ingredientController));

  return router;
}

IoC.callable('ingredientRouter', ['ingredientController'], ingredientRouter);
