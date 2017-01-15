import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UpdateGenreCommand {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(viewer, genreId, {
    name,
  }) {
    return await this.genreRepository.update(viewer, genreId, {
      name
    });
  }
}

IoC.singleton('updateGenreCommand', ['genreRepository'], UpdateGenreCommand);
