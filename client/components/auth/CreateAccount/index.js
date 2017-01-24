import React from 'react';
import Relay from 'react-relay';
import { css, style } from 'glamor';

import MenuItem from 'material-ui/MenuItem';
import CreateUserMutation from 'mutations/CreateUserMutation';

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

class CreateAccount extends React.Component {

  static propTypes = {
    onUserCreateSuccess: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.setState({
      userType: 'blogger',
      errors: {},
    });
  }

  createUserSuccess({ createUser }) {
    this.props.onUserCreateSuccess(createUser);
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
    const mutation = new CreateUserMutation(data);
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
                  formsy
                  validations="isExisty"
                  validationError={errorMessage}
                  required={true}
                  style={styles.textField}
                  disabled={ !this.props.viewer.isAdmin }
                />
                <InputField
                  name="nickName"
                  hintText="Nickname erscheint als Autor"
                  formsy
                  style={styles.textField}
                />
              </EditBlock>
              <EditBlock>
                <InputField
                  name="email"
                  hintText="Email eingeben"
                  floatingLabelText="Email"
                  formsy
                  validations="isEmail"
                  validationError={errorMessage}
                  required={true}
                  style={styles.textField}
                  />
              </EditBlock>
            </div>
          </div>
          <div style={styles.formActions}>
            <Button
              primary={true}
              type="submit"
              label={<FormattedMessage id="actions.create" />}
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

export default Relay.createContainer(CreateAccount, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        isAdmin
      }
    `
  }
});
