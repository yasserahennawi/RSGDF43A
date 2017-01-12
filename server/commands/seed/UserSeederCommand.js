export default class UserSeederCommand {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    await this.userRepository.create({
      email: "kareem3d.a@gmail.com",
      password: "kareem123",
      firstName: "Kareem",
      lastName: "Mohamed",
      nickName: "kemo",
      userType: "Admin",
    });
  }
}
