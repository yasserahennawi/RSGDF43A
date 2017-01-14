import { Router } from 'express';
import IoC from 'AppIoC';

export const apiRouter = (
  authMiddleware,
  errorMiddleware,
  userRouter
) => {
  let router = Router();

  // Authenticate user
  router.use(authMiddleware.setViewer.bind(authMiddleware));
  router.use('/user', userRouter);
  router.use(errorMiddleware.log.bind(errorMiddleware));
  router.use(errorMiddleware.response.bind(errorMiddleware));

  return router;
}

IoC.callable('apiRouter', [
  'authMiddleware',
  'errorMiddleware',
  'userRouter'
], apiRouter);
