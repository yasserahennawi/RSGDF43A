import { Router } from 'express';
import IoC from 'AppIoC';

export const genreRouter = (genreController) => {
  const router = Router();

  router.get('/', genreController.find.bind(genreController));
  router.get('/:genreId', genreController.findById.bind(genreController));
  router.post('/', genreController.create.bind(genreController));
  router.put('/:genreId', genreController.update.bind(genreController));
  router.delete('/:genreId', genreController.remove.bind(genreController));

  return router;
}

IoC.callable('genreRouter', ['genreController'], genreRouter);
