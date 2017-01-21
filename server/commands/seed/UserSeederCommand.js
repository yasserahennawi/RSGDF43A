import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

export default class UserSeederCommand {

  constructor(
    userRepository,
    secretKey) {
    this.userRepository = userRepository;
    this.secretKey = secretKey;
  }

  async execute(secretKey) {
    if(this.secretKey !== secretKey) {
      throw new ForbiddenError("You dont have access to do this action");
    }

    const superUser = await this.userRepository.createSuperUser();
    const adminUser = await this.userRepository.create(superUser, {
      email: "kareem3d.a@gmail.com",
      password: 'kareem123',
      firstName: "Kareem",
      lastName: "Mohamed",
      userType: 'Admin',
    });
    const adminUser2 = await this.userRepository.create(superUser, {
      email: "admin@pimentagroup.de",
      password: 'tastetastic',
      firstName: "Pimenta",
      lastName: "Group",
      userType: 'Admin',
    });

    return [ superUser, adminUser, adminUser2 ];
  }
}

IoC.singleton('userSeederCommand', [
  'userRepository',
  'secretKey',
], UserSeederCommand);
