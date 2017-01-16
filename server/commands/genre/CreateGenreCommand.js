import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateGenreCommand {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(viewer, attrs) {
    return await this.genreRepository.create(viewer, attrs);
  }
}

IoC.singleton('createGenreCommand', ['genreRepository'], CreateGenreCommand);
