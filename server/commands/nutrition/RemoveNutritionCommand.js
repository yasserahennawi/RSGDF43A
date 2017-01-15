import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class RemoveNutritionCommand {
  constructor(nutritionRepository) {
    this.nutritionRepository = nutritionRepository;
  }

  async execute(viewer, nutritionId) {
    return await this.nutritionRepository.remove(viewer, nutritionId);
  }
}

IoC.singleton('removeNutritionCommand', ['nutritionRepository'], RemoveNutritionCommand);
