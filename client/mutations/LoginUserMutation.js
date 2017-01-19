import Relay from 'react-relay';

class LoginUserMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        token
      }
    `
  };

  getMutation() {
    return Relay.QL`
      mutation {
        login
      }
    `;
  }

  getVariables() {
    return {
      email: this.props.email,
      password: this.props.password,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload {
        viewer {
          token
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      }
    }];
  }
}

export default LoginUserMutation;
