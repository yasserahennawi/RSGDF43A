import Relay from 'react-relay';

class CreateUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createUser
      }
    `;
  }

  getVariables() {
    return {
      email: this.props.email,
      userType: this.props.userType,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nickName: this.props.nickName,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateUserPayload {
        user
      }
    `;
  }

  getConfigs() {
    return [{
      type: "REQUIRED_CHILDREN",
      children: [
        Relay.QL`
          fragment on CreateUserPayload {
            user {
              id
              firstName
            }
          }
        `
      ]
    }];
  }
}

export default CreateUserMutation;
