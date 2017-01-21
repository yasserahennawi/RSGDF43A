import { Router } from 'express';
import IoC from 'AppIoC';

export const apiRouter = (
  userRouter,
  genreRouter,
  ingredientRouter,
  invoiceRouter,
  nutritionRouter,
  orientationRouter,
  productRouter,
  recipeRouter
) => {
  let router = Router();

  // Authenticate user
  router.use('/user', userRouter);
  router.use('/genre', genreRouter);
  router.use('/ingredient', ingredientRouter);
  router.use('/invoice', invoiceRouter);
  router.use('/nutrition', nutritionRouter);
  router.use('/orientation', orientationRouter);
  router.use('/product', productRouter);
  router.use('/recipe', recipeRouter);

  return router;
}

IoC.callable('apiRouter', [
  'userRouter',
  'genreRouter',
  'ingredientRouter',
  'invoiceRouter',
  'nutritionRouter',
  'orientationRouter',
  'productRouter',
  'recipeRouter',
], apiRouter);
