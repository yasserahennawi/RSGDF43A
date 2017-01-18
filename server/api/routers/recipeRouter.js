import { Router } from 'express';
import IoC from 'AppIoC';

export const recipeRouter = (recipeController) => {
  const router = Router();

  // Custom routes
  router.get('/daily', recipeController.getDailyRecipes.bind(recipeController));
  router.get('/refresh', recipeController.refresh.bind(recipeController));

  router.get('/', recipeController.find.bind(recipeController));
  router.get('/:recipeId', recipeController.findById.bind(recipeController));
  router.post('/', recipeController.create.bind(recipeController));
  router.put('/:recipeId', recipeController.update.bind(recipeController));
  router.delete('/:recipeId', recipeController.remove.bind(recipeController));

  return router;
}

IoC.callable('recipeRouter', ['recipeController'], recipeRouter);
