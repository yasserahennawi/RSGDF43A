import IoC from 'AppIoC';
import ValidationError from '../errors/ValidationError';

export default class TokenAuth {

  constructor(userRepository, encoderDecoder, guestUser) {
    this.userRepository = userRepository;
    this.encoderDecoder = encoderDecoder;
    this.guestUser = guestUser;
  }

  async getViewer(token) {
    const viewerId = await this.getViewerId(token);
    if(! viewerId) {
      return this.guestUser;
    }
    const viewer = await this.userRepository.findById(this.guestUser, viewerId);
    return viewer || this.guestUser;
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

IoC.singleton('tokenAuth', ['userRepository', 'encoderDecoder', 'guestUser'], TokenAuth);
