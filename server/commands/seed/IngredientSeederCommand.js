import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';
import * as Q from 'q';

export default class IngredientSeederCommand {

  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  getData() {
    return [
      { category: 'Fleisch', subCategory: '', name: 'Huhn'},
      { category: 'Fleisch', subCategory: '', name: 'Rind'},
      { category: 'Fleisch', subCategory: '', name: 'Schwein'},
      { category: 'Fleisch', subCategory: 'Geflügel', name: 'Ente'},
      { category: 'Fleisch', subCategory: 'Geflügel', name: 'Pute'},
      { category: 'Fleisch', subCategory: 'Geflügel', name: 'Strauß'},
      { category: 'Fleisch', subCategory: 'Geflügel', name: 'Truthahn'},
      { category: 'Fleisch', subCategory: '', name: 'Kalb'},
      { category: 'Fleisch', subCategory: '', name: 'Lamm'},
      { category: 'Fleisch', subCategory: '', name: 'Faschiertes'},
      { category: 'Fleisch', subCategory: '', name: 'Speck'},
      { category: 'Fleisch', subCategory: '', name: 'Innereien'},
      { category: 'Fisch', subCategory: '', name: 'Forelle'},
      { category: 'Fisch', subCategory: '', name: 'Dorsch'},
      { category: 'Fisch', subCategory: '', name: 'Lachs'},
      { category: 'Fisch', subCategory: '', name: 'Hecht'},
      { category: 'Fisch', subCategory: '', name: 'Karpfen'},
      { category: 'Fisch', subCategory: '', name: 'Barsch'},
      { category: 'Fisch', subCategory: '', name: 'Sardelle'},
      { category: 'Fisch', subCategory: '', name: 'Tintenfisch'},
      { category: 'Fisch', subCategory: '', name: 'Scholle'},
      { category: 'Fisch', subCategory: '', name: 'Thunfisch'},
      { category: 'Fisch', subCategory: '', name: 'Zander'},
      { category: 'Fisch', subCategory: 'Meeresfrüchte', name: 'Meeresfrüchte'},
      { category: 'Fisch', subCategory: 'Meeresfrüchte', name: 'Garnelen'},
      { category: 'Fisch', subCategory: 'Meeresfrüchte', name: 'Krebs'},
      { category: 'Fisch', subCategory: 'Meeresfrüchte', name: 'Muschel'},
      { category: 'Fisch', subCategory: 'Meeresfrüchte', name: 'Scampi'},
      { category: 'Obst', subCategory: '', name: 'Ananas'},
      { category: 'Obst', subCategory: '', name: 'Apfel'},
      { category: 'Obst', subCategory: '', name: 'Avocado'},
      { category: 'Obst', subCategory: '', name: 'Banane'},
      { category: 'Obst', subCategory: '', name: 'Erdbeeren'},
      { category: 'Obst', subCategory: '', name: 'Kiwi'},
      { category: 'Obst', subCategory: '', name: 'Marille'},
      { category: 'Obst', subCategory: '', name: 'Melone'},
      { category: 'Obst', subCategory: '', name: 'Rhabaarber'},
      { category: 'Obst', subCategory: '', name: 'Orange'},
      { category: 'Obst', subCategory: '', name: 'Trauben'},
      { category: 'Obst', subCategory: '', name: 'Zitrone'},
      { category: 'Obst', subCategory: '', name: 'Kokosnuss'},
      { category: 'Obst', subCategory: '', name: 'Mango'},
      { category: 'Gemüse', subCategory: '', name: 'Bohnen'},
      { category: 'Gemüse', subCategory: '', name: 'Brokkoli'},
      { category: 'Gemüse', subCategory: '', name: 'Champignons'},
      { category: 'Gemüse', subCategory: '', name: 'Erbsen'},
      { category: 'Gemüse', subCategory: '', name: 'Gurke'},
      { category: 'Gemüse', subCategory: '', name: 'Rüben'},
      { category: 'Gemüse', subCategory: '', name: 'Karfiol'},
      { category: 'Gemüse', subCategory: '', name: 'Karotten'},
      { category: 'Gemüse', subCategory: 'Kraut', name: 'Kraut'},
      { category: 'Gemüse', subCategory: 'Kraut', name: 'Sauerkraut'},
      { category: 'Gemüse', subCategory: 'Kraut', name: 'Weißkraut'},
      { category: 'Gemüse', subCategory: 'Kraut', name: 'Rot-/Blaukraut'},
      { category: 'Gemüse', subCategory: '', name: 'Mais'},
      { category: 'Gemüse', subCategory: '', name: 'Kartoffel'},
      { category: 'Gemüse', subCategory: '', name: 'Oliven'},
      { category: 'Gemüse', subCategory: '', name: 'Paprika'},
      { category: 'Gemüse', subCategory: '', name: 'Spargel'},
      { category: 'Gemüse', subCategory: '', name: 'Spinat'},
      { category: 'Gemüse', subCategory: '', name: 'Tomaten'},
      { category: 'Gemüse', subCategory: '', name: 'Zuccini'},
      { category: 'Gemüse', subCategory: '', name: 'Zwiebel'},
      { category: 'Gemüse', subCategory: '', name: 'Knoblauch'},
      { category: 'Gemüse', subCategory: '', name: 'Kürbis'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Bärauch'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Basilikum'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Chili'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Curry'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Ketchup'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Kren'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Kümmel'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Paprikapulver'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Schnittlauch'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Rosmarin'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Senf'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Soja'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Vanille'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Wasabi'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Zucker'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Petersilie'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Ingwer'},
      { category: 'Gewürze/Soßen', subCategory: '', name: 'Zimt'},
      { category: 'Milchprodukte', subCategory: '', name: 'Butter'},
      { category: 'Milchprodukte', subCategory: '', name: 'Joghurt'},
      { category: 'Milchprodukte', subCategory: 'Käse', name: 'Käse'},
      { category: 'Milchprodukte', subCategory: 'Käse', name: 'Frischkäse'},
      { category: 'Milchprodukte', subCategory: 'Käse', name: 'Hartkäse'},
      { category: 'Milchprodukte', subCategory: 'Käse', name: 'Weichkäse'},
      { category: 'Sonstiges', subCategory: '', name: 'Ei'},
      { category: 'Sonstiges', subCategory: '', name: 'Mehl'},
      { category: 'Sonstiges', subCategory: '', name: 'Brot'},
      { category: 'Sonstiges', subCategory: '', name: 'Honig'},
      { category: 'Sonstiges', subCategory: '', name: 'Mohn'},
      { category: 'Sonstiges', subCategory: '', name: 'Nudeln'},
      { category: 'Sonstiges', subCategory: 'Nuss', name: 'Nuss'},
      { category: 'Sonstiges', subCategory: 'Nuss', name: 'Mandeln'},
      { category: 'Sonstiges', subCategory: 'Nuss', name: 'Muskat'},
      { category: 'Sonstiges', subCategory: '', name: 'Pilze'},
      { category: 'Sonstiges', subCategory: '', name: 'Polenta'},
      { category: 'Sonstiges', subCategory: 'Salat', name: 'Salat'},
      { category: 'Sonstiges', subCategory: 'Salat', name: 'Ruccola'},
      { category: 'Sonstiges', subCategory: 'Salat', name: 'Eisberg'},
      { category: 'Sonstiges', subCategory: '', name: 'Semmel'},
      { category: 'Sonstiges', subCategory: '', name: 'Reis'},
      { category: 'Sonstiges', subCategory: '', name: 'Tofu'},
    ];
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    return await this.ingredientRepository.createAll(viewer, this.getData());
  }
}

IoC.singleton('ingredientSeederCommand', ['ingredientRepository'], IngredientSeederCommand);
