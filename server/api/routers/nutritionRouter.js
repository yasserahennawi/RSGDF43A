import { Router } from 'express';
import IoC from 'AppIoC';

export const nutritionRouter = (nutritionController) => {
  const router = Router();

  router.get('/', nutritionController.find.bind(nutritionController));
  router.get('/:nutritionId', nutritionController.findById.bind(nutritionController));
  router.post('/', nutritionController.create.bind(nutritionController));
  router.put('/:nutritionId', nutritionController.update.bind(nutritionController));
  router.delete('/:nutritionId', nutritionController.remove.bind(nutritionController));

  return router;
}

IoC.callable('nutritionRouter', ['nutritionController'], nutritionRouter);
