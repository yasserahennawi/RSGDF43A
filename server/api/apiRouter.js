import { Router } from 'express';
import IoC from 'AppIoC';

export const apiRouter = (
  authMiddleware,
  errorMiddleware,
  userRouter
) => {
  let router = Router();

  // Authenticate user
  router.use('/api/v1', authMiddleware.setViewer.bind(authMiddleware));
  router.use('/api/v1/user', userRouter);
  router.use('/api/v1', errorMiddleware.log.bind(errorMiddleware));
  router.use('/api/v1', errorMiddleware.response.bind(errorMiddleware));

  return router;
}

IoC.callable('apiRouter', [
  'authMiddleware',
  'errorMiddleware',
  'userRouter'
], apiRouter);
