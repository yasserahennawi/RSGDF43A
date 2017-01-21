import Relay from 'react-relay';

class UpdateUserMutation extends Relay.Mutation {

  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `
  }

  constructor(data) {
    super(data);
  }

  getMutation() {
    return Relay.QL`
      mutation {
        updateUser
      }
    `;
  }

  getVariables() {
    return {
      id: this.props.user.id,
      email: this.props.email,
      company: this.props.company,
      userType: this.props.userType,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nickName: this.props.nickName,
      addressStreet: this.props.addressStreet,
      addressStreetNumber: this.props.addressStreetNumber,
      addressComplement: this.props.addressComplement,
      addressZip: this.props.addressZip,
      addressCity: this.props.addressCity,
      addressCountry: this.props.addressCountry,
      oldPassword: this.props.oldPassword,
      password: this.props.password,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateUserPayload {
        user
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      }
    }];
  }
}

export default UpdateUserMutation;
