import IoC from 'AppIoC';
import ForbiddenError from '../../errors/ForbiddenError';

export default class UserSeederCommand {

  constructor(userRepository, secretKey) {
    this.userRepository = userRepository;
    this.secretKey = secretKey;
  }

  async execute(secretKey) {
    console.log('secretKey', secretKey);
    if(this.secretKey !== secretKey) {
      throw new ForbiddenError("You dont have access to do this action");
    }

    const superUser = await this.userRepository.createSuperUser();
    const adminUser = await this.userRepository.create(superUser, {
      email: "kareem3d.a@gmail.com",
      // It's very important to create a strong password here that no one can figure out
      password: 'kareem123',
      firstName: "Kareem",
      lastName: "Mohamed",
      userType: 'Admin',
    });

    return [ superUser, adminUser ];
  }
}

IoC.singleton('userSeederCommand', ['userRepository', 'secretKey'], UserSeederCommand);
