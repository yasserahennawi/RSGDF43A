import IoC from 'AppIoC';

export default class AuthMiddleware {
  constructor(authManager) {
    this.authManager = authManager;
  }

  async getToken(req) {
    let token;
    const headerToken = req.get('Authorization');
    if (headerToken) {
      token = headerToken.replace('JWT ', '');
    } else if (req.query.state) {
      token = req.query.state;
    }
    return token;
  }

  async setViewer(req, res, next) {
    const token = await this.getToken(req);
    req.viewer = await this.authManager.getViewer(token);
    next();
  }
}

IoC.singleton('authMiddleware', [
  'authManager',
], AuthMiddleware);
