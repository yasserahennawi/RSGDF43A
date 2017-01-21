import React from 'react';
import Relay from 'react-relay';
import { css, style } from 'glamor';

import CoverUpload from 'components/image/CoverUpload';
import MenuItem from 'material-ui/MenuItem';
import UpdateUserMutation from 'mutations/UpdateUserMutation';

import SnackbarError from 'components/utils/SnackbarError';
import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import EditBlock from 'components/utils/EditBlock';
import Button from 'components/utils/Button';
import { FormattedMessage } from 'react-intl';
import Formsy from 'formsy-react';
import {
  isValidationError,
  getErrorValidationObject
} from 'helpers/error';

Formsy.addValidationRule('isValidNewPassword', (values, value) =>
  !!(!value || (
    ( value.length >= 6 ) && ( value === values[ 'password' ] ) && ( values[ 'oldPassword' ] ) )
  ));

class EditUserDetails extends React.Component {

  static propTypes = {
    onUserUpdateSuccess: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.setState({
      userType: this.props.user.userType,
      errors: {},
    });
  }

  createUserSuccess({ updateUser }) {
    this.props.onUserUpdateSuccess(updateUser);
  }

  createUserFailure(err) {
    if(isValidationError(err)) {
      this.setState({
        validationErrors: getErrorValidationObject(err),
      });
    } else {
      this.setState({
        unknownError: err,
      })
    }
  }

  onSubmit(data) {
    const mutation = new UpdateUserMutation({
      ...data,
      user: this.props.user,
    });

    this.props.relay.commitUpdate(mutation, {
        onSuccess: this.createUserSuccess.bind(this),
        onFailure: this.createUserFailure.bind(this),
      }
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <Formsy.Form
          onValid={() => this.setState({ isValid: true })}
          onInvalid={() => this.setState({ isValid: false })}
          onValidSubmit={(data) => this.onSubmit(data)}
          onChange={() => this.setState({ validationErrors: null })}
          validationErrors={this.state.validationErrors}
        >
        <div className={`${formDivisor}`}>
          <div {...style({flex:2})}>
            { this.props.viewer.isAdmin ?
              <div >
                <SelectField
                  name="userType"
                  value={this.state.userType}
                  onChange={(e, value) => {
                    this.setState({ userType: value })
                  }}
                  formsy={ true }>
                  <MenuItem value={ 'blogger' } primaryText="Blogger" />
                  <MenuItem value={ 'publisher' } primaryText="Verlager" />
                </SelectField>
              </div> : null }

              <EditBlock>
                { this.state.userType == 'publisher' ?
                  <InputField
                    name="company"
                    hintText={ <FormattedMessage id="authors.fields.company" /> }
                    floatingLabelText={ <FormattedMessage id="authors.fields.company" /> }
                    defaultValue={this.props.user.company}
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                    disabled={ !this.props.viewer.isAdmin }
                  /> : null }
                <InputField
                  name="firstName"
                  hintText="Vorname eingeben"
                  floatingLabelText="name"
                  defaultValue={this.props.user.firstName}
                  formsy
                  validations="isExisty"
                  validationError={errorMessage}
                  required={true}
                  style={styles.textField}
                  disabled={ !this.props.viewer.isAdmin }
                />

                <InputField
                  name="lastName"
                  hintText="Nachname eingeben"
                  defaultValue={this.props.user.lastName}
                  formsy
                  validations="isExisty"
                  validationError={errorMessage}
                  required={true}
                  style={styles.textField}
                  disabled={ !this.props.viewer.isAdmin }
                />
                <InputField
                  name="nickName"
                  defaultValue={this.props.user.nickName}
                  hintText="Nickname erscheint als Autor"
                  formsy
                  style={styles.textField}
                />
              </EditBlock>
              <EditBlock>
                <InputField
                  name="email"
                  defaultValue={this.props.user.email}
                  hintText="Email eingeben"
                  floatingLabelText="Email"
                  formsy
                  validations="isEmail"
                  validationError={errorMessage}
                  required={true}
                  style={styles.textField}
                  />
              </EditBlock>
              <EditBlock>
                <InputField
                  name="oldPassword"
                  floatingLabelText="Aktuelles Passwort"
                  hintText="Aktuelles Passwort eingeben"
                  formsy
                  type={"password"}
                  validationError={errorMessage}
                  style={styles.textField}
                />

                <InputField
                  name="password"
                  floatingLabelText="Neues Passwort"
                  hintText="Neues Passwort eingeben"
                  formsy
                  type={"password"}
                  validationError={errorMessage}
                  style={styles.textField}
                />

                <InputField
                  name="passwordConfirmation"
                  floatingLabelText="Neues Passwort wiederholen"
                  hintText="Neues Passwort nochmal eingeben"
                  formsy
                  type={"password"}
                  validations="isValidNewPassword"
                  validationError={errorPasswordMessage}
                  style={styles.textField}
                />

              </EditBlock>
              <EditBlock>
                <div {...css({display: 'flex', width: '86%'})}>
                  <InputField
                    name="addressStreet"
                    hintText="Straße"
                  defaultValue={this.props.user.addressStreet}
                    floatingLabelText="Adresse"
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                  />

                  <InputField
                    name="addressStreetNumber"
                    defaultValue={this.props.user.addressStreetNumber}
                    hintText="Nr."
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                  />
                </div>
                <div {...css({display: 'flex'})}>
                  <InputField
                    defaultValue={this.props.user.addressComplement}
                    name="addressComplement"
                    hintText="Adresszusatz"
                    formsy
                    style={styles.textField}
                  />
                </div>

                <div {...css({display: 'flex', width: '86%'})}>
                  <InputField
                    defaultValue={this.props.user.addressZip}
                    name="addressZip"
                    hintText="PLZ"
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                  />
                  <InputField
                    defaultValue={this.props.user.addressCity}
                    name="addressCity"
                    hintText="Stadt"
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                  />
                </div>
                <div {...css({display: 'flex'})}>
                  <InputField
                    defaultValue={this.props.user.addressCountry}
                    name="addressCountry"
                    hintText="Land"
                    formsy
                    validations="isExisty"
                    validationError={errorMessage}
                    required={true}
                    style={styles.textField}
                  />
                </div>
              </EditBlock>
            </div>
          </div>
          <div style={styles.formActions}>
            <Button
              primary={true}
              type="submit"
              label={<FormattedMessage id="actions.next" />}
              disabled={ !this.state.isValid }
            />
          </div>
        </Formsy.Form>
        <SnackbarError
          error={this.state.unknownError}
          dismiss={() => this.setState({ unknownError: null })}
        />
      </div>
    )
  }
}

const errorMessage = 'This field should be filled';
const errorPasswordMessage = 'The password confirmation need match with new password'

const styles = {
  textField: {
    width: '80%',
  },
  formActions: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const formDivisor = style({
  display: 'flex',
  justifyContent: 'space-between'
});

const foto = style({
  flex: 1,
  padding: 45,
  alignItems: 'center',
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
});

export default Relay.createContainer(EditUserDetails, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        userType
        company
        firstName
        lastName
        nickName
        email
        addressStreet
        addressStreetNumber
        addressComplement
        addressZip
        addressCity
        addressCountry
        ${UpdateUserMutation.getFragment('user')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        isAdmin
      }
    `
  }
});
