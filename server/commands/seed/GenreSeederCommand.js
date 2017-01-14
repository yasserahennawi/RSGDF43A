import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class GenreSeederCommand {

  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    return await this.genreRepository.createAll(viewer, [
      {name: 'Vegetarisch'},
      {name: 'Vegan'},
      {name: 'Pescetarisch'},
      {name: 'Fleisch'},
      {name: 'Frühling'},
      {name: 'Sommer'},
      {name: 'Herbst'},
      {name: 'Winter'},
      {name: 'Ostern'},
      {name: 'Weihnachten'},
      {name: 'Getränke'},
      {name: 'Alkohol'},
      {name: 'Alkoholfrei'},
      {name: 'Nachspeißen'},
      {name: 'LowCarb'},
      {name: 'Glutenfrei'},
      {name: 'Laktosefrei'},
      {name: 'Schlanke Linie'},
      {name: 'Abnehmen'},
      {name: 'Österreichische Küche'},
      {name: 'Deutsche Küche'},
      {name: 'Schweizer Küche'},
      {name: 'Italienisch'},
      {name: 'Griechisch'},
      {name: 'Chinesich'},
      {name: 'Marrokanisch'},
      {name: 'Thailändisch'},
      {name: 'Japanisch'},
      {name: 'Scharf'},
      {name: 'Meerestiere'},
      {name: 'Früchte'},
      {name: 'Für Kinder'},
      {name: 'Feier'},
      {name: 'Spanisch'},
      {name: 'Südländisch'},
      {name: 'Französisch'},
      {name: 'Snacks'},
      {name: 'Salate'},
      {name: 'Suppen'},
      {name: 'Frühstück'},
      {name: 'Grundrezept'},
      {name: 'Backen'},
      {name: 'Gebäck'},
      {name: 'Kekse'},
      {name: 'Naschereien'},
    ]);
  }
}

IoC.singleton('genreSeederCommand', ['genreRepository'], GenreSeederCommand);
