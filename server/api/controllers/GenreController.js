import Controller from './Controller';
import IoC from 'AppIoC';

export default class GenreController extends Controller {
  constructor(
    genreRepository,
    createGenreCommand,
    updateGenreCommand,
    removeGenreCommand,
    commandExecuter
  ) {
    super();
    this.genreRepository = genreRepository;
    this.createGenreCommand = createGenreCommand;
    this.updateGenreCommand = updateGenreCommand;
    this.removeGenreCommand = removeGenreCommand;
    this.commandExecuter = commandExecuter;
  }

  find(req, res, next) {
    this.genreRepository.find(req.viewer, req.query)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  findById(req, res, next) {
    this.genreRepository.findById(req.viewer, req.params.genreId)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  create(req, res, next) {
    this.commandExecuter.execute(this.createGenreCommand, req.viewer, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  update(req, res, next) {
    this.commandExecuter.execute(this.updateGenreCommand, req.viewer, req.params.genreId, req.body)
      .then(result => this.successResponse(res, { result }))
      .then(null, next);
  }

  remove(req, res, next) {
    this.commandExecuter.execute(this.removeGenreCommand, req.viewer, req.params.genreId)
      .then(result => this.successResponse(res, { result: { deleted: true, result: result._id } }))
      .then(null, next);
  }
}


IoC.singleton('genreController', [
  'genreRepository',
  'createGenreCommand',
  'updateGenreCommand',
  'removeGenreCommand',
  'commandExecuter',
], GenreController)
