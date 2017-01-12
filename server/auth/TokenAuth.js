import ValidationError from '../errors/ValidationError';

export default class TokenAuth {

  constructor(userRepository, encoderDecoder) {
    this.userRepository = userRepository;
    this.encoderDecoder = encoderDecoder;
  }

  async getGuest() {
    // Mocking user model to have expected behavior in all our app
    return {
      isGuest: () => true,
      isAdmin: () => false,
      isBlogger: () => false,
      isCustomer: () => false,
      checkId: () => false,

      firstName: "Guest",
      lastName: "User",
      profileImage: {
        src: 'https://images.cdn.circlesix.co/image/2/100/100/5/assets/img/user.jpg',
        versions: [{
          width: 100,
          height: 100,
          src: 'https://images.cdn.circlesix.co/image/2/100/100/5/assets/img/user.jpg',
        }]
      }
    };
  }

  async getViewer(token) {
    const viewerId = await this.getViewerId(token);
    if(! viewerId) {
      return this.getGuest();
    }
    return this.userRepository.findById(viewerId);
  }

  async getViewerId(token) {
    if(! token) {
      return null;
    }

    const decoded = await this.encoderDecoder.decode(token);

    if(! decoded) {
      return null;
    }

    return decoded.viewerId;
  }

  async constructToken(viewer) {
    if(! viewer || !viewer._id) {
      return null;
    }

    return this.encoderDecoder.encode({
      viewerId: viewer._id,
    })
  }
}
