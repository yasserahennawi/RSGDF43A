import IoC from 'AppIoC';
import * as jwt from 'jsonwebtoken';

export default class JwtEncoderDecoder {
  constructor(secretKey) {
    this.secretKey = secretKey;

    if(! secretKey) {
      throw new Error("JwtEncoderDecoder needs a secretKey");
    }
  }

  encode(data) {
    return jwt.sign(data, this.secretKey);
  }

  decode(token) {
    return jwt.decode(token, this.secretKey);
  }
}

IoC.singleton('jwtEncoderDecoder', ['secretKey'], JwtEncoderDecoder);
