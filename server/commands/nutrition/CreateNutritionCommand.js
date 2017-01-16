import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class CreateNutritionCommand {
  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async execute(viewer, attrs) {
    return await this.nutritionRepository.create(viewer, attrs);
  }
}

IoC.singleton('createNutritionCommand', ['nutritionRepository'], CreateNutritionCommand);
