import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UserPreferencesSeederCommand {

  constructor(
    userRepository,
    seedHelper,
    orientationRepository,
    ingredientRepository) {
    this.userRepository = userRepository;
    this.seedHelper = seedHelper;
    this.orientationRepository = orientationRepository;
    this.ingredientRepository = ingredientRepository;
  }

  async getIngredientsIds(viewer, number) {
    return await this.seedHelper.getRandomIds(viewer, this.ingredientRepository, number);
  }

  async getOrientationsIds(viewer, number) {
    return await this.seedHelper.getRandomIds(viewer, this.orientationRepository, number);
  }

  getData() {
    return [
      { name: 'Mit fleisch' },
      { name: 'Vegetarisch' },
      { name: 'Pescetarisch' },
      { name: 'Vegan' },
    ];
  }

  async execute(viewer) {
    if(!viewer.isSuper()) {
      throw new ForbiddenError("You are not authorized to do this action");
    }

    const ingredients = await this.getIngredientsIds(viewer, 12);
    const users = await this.userRepository.find(viewer, {
      email: "kareem3d.a@gmail.com",
    });
    return await this.userRepository.update(viewer, users[0]._id, {
      preferences: {
        ingredients: ingredients.slice(0, 6),
        orientations: await this.getOrientationsIds(viewer, 2),
        balancedPercentage: 50,
        healthyPercentage: 50,
        alergies: ingredients.slice(6),
        mealType: 'dinner',
      }
    })
  }
}

IoC.singleton('userPreferencesSeederCommand', [
  'userRepository',
  'seedHelper',
  'orientationRepository',
  'ingredientRepository',
], UserPreferencesSeederCommand);
