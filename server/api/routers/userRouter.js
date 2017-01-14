import { Router } from 'express';
import IoC from 'AppIoC';

export const userRouter = (userController) => {
  const router = Router();

  router.post('/login', userController.login.bind(userController));
  router.get('/viewer', userController.viewer.bind(userController));
  router.get('/', userController.find.bind(userController));
  router.get('/:userId', userController.findById.bind(userController));
  router.post('/', userController.create.bind(userController));
  router.put('/:userId', userController.update.bind(userController));
  router.delete('/:userId', userController.remove.bind(userController));

  return router;
}

IoC.callable('userRouter', ['userController'], userRouter);
