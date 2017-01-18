import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class RemoveGenreCommand {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(viewer, genreId) {
    return await this.genreRepository.remove(viewer, genreId);
  }
}

IoC.singleton('removeGenreCommand', ['genreRepository'], RemoveGenreCommand);
