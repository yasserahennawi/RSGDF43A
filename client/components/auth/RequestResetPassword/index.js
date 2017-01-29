import React, { Component } from 'react';
import Relay from 'react-relay';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import { placeholder, style } from 'glamor';
import Formsy from 'formsy-react';

import {css} from 'glamor';

import styles from './styles';

import Logo from 'components/layout/Logo';
import Copyright from 'components/layout/Copyright';

import InputField from 'components/utils/InputField';
import Button from 'components/utils/Button';
import Checkbox from 'components/utils/Checkbox';

import { requestResetPassword } from 'apis/user';
import { getErrorValidationMessage, getErrorMessage } from 'helpers/error';

import {
  setUserToken,
  getFromStorage,
  setInStorage,
} from 'helpers/storage';

class RequestResetPassword extends Component {
  componentWillMount() {
    this.setState({
      isLoading: false,
      isFormValid: false,
      errorMessage: '',
      successMessage: '',
    });
  }

  handleSnackbarConfirm() {
    this.setState({
      errorMessage: "",
    });
  }

  toggleValidForm(valid) {
    return () => {
      this.setState({
        isFormValid: valid,
      });
    };
  }

  getErrorMessage(err) {
    return getErrorValidationMessage(err, 'email') || getErrorMessage(err);
  }

  handleRequestResetPassword({ email }) {
    this.setState({ isLoading: true });

    requestResetPassword(email)
      .then(() => {
        this.setState({ successMessage: "An email has been sent with steps to reset password" });
      })
      .then(null, (err) => {
        this.setState({ isLoading: false, errorMessage: this.getErrorMessage(err) });
      });
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <div style={styles.logo}>
          <Logo />
        </div>
        <div className={css(styles.containerC)}>
          <Formsy.Form
            onValid={this.toggleValidForm(true)}
            onInvalid={this.toggleValidForm(false)}
            onValidSubmit={ this.handleRequestResetPassword.bind(this) }
          >
            <Card style={styles.card}>
              <CardHeader
                title="Reset password"
                textStyle={styles.titleText}
                style={styles.title}
              />
              <CardText style={styles.cardText}>
                <InputField
                  floatingLabelText="EMAIL-ADDRESSE"
                  name="email"
                  placeholder="Email-Adresse"
                  style={styles.textField}
                  formsy
                  required={true}
                  validations="isEmail"
                />
                <p style={{ color: '#4CAF50' }}>
                  {this.state.successMessage}
                </p>
              </CardText>

              <CardActions
                style={styles.cardActions}
              >
                <Button
                  label="Submit"
                  type="submit"
                  primary={true}
                  style={styles.buttonContainer}
                  buttonStyle={styles.button}
                  labelStyle={styles.buttonLabel}
                  disabled={!this.state.isFormValid || this.state.isLoading}
                />
              </CardActions>

            </Card>
          </Formsy.Form>

        </div>
        <Snackbar
          open={!!this.state.errorMessage}
          message={this.state.errorMessage}
          action="OK"
          autoHideDuration={7000}
          onActionTouchTap={this.handleSnackbarConfirm.bind(this)}
          onRequestClose={this.handleSnackbarConfirm.bind(this)}
        />
        <div style={styles.copyright}>
          <Copyright />
        </div>
      </div>
    );
  }
}

export default RequestResetPassword;

