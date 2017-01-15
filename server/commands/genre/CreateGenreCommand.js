import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateGenreCommand {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(viewer, {
    name,
  }) {
    return await this.genreRepository.create(viewer, {
      name
    });
  }
}

IoC.singleton('createGenreCommand', ['genreRepository'], CreateGenreCommand);
