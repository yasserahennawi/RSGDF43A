import { Router } from 'express';
import IoC from 'AppIoC';

export const orientationRouter = (orientationController) => {
  const router = Router();

  router.get('/', orientationController.find.bind(orientationController));
  router.get('/:orientationId', orientationController.findById.bind(orientationController));
  router.post('/', orientationController.create.bind(orientationController));
  router.put('/:orientationId', orientationController.update.bind(orientationController));
  router.delete('/:orientationId', orientationController.remove.bind(orientationController));

  return router;
}

IoC.callable('orientationRouter', ['orientationController'], orientationRouter);
