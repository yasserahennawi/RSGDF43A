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

import { resetPassword } from 'apis/user';
import { getErrorValidationMessage, getErrorMessage } from 'helpers/error';

import {
  setUserToken,
  getFromStorage,
  setInStorage,
} from 'helpers/storage';

class ResetPassword extends Component {
  static propTypes = {
    resetKey: React.PropTypes.string.isRequired,
    onResetPasswordSuccess: React.PropTypes.func.isRequired,
  };

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

  handleResetPassword({ password, checkPassword }) {
    if(password !== checkPassword) {
      this.setState({ errorMessage: "Password fields dont match!" });
      return;
    }

    this.setState({ isLoading: true });

    resetPassword(this.props.resetKey, password)
      .then(() => {
        this.props.onResetPasswordSuccess();
      })
      .then(null, (err) => {
        this.setState({ isLoading: false, errorMessage: getErrorValidationMessage(err, "password") || getErrorMessage(err) });
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
            onValidSubmit={ this.handleResetPassword.bind(this) }
          >
            <Card style={styles.card}>
              <CardHeader
                title="Reset password"
                textStyle={styles.titleText}
                style={styles.title}
              />
              <CardText style={styles.cardText}>
                <InputField
                  floatingLabelText="Neues Passwort"
                  hintText="Neues Passwort eingeben"
                  type={"password"}
                  name="password"
                  formsy
                  required={true}
                  style={styles.textField}
                />
                <InputField
                  floatingLabelText="Neues Passwort wiederholen"
                  hintText="Neues Passwort nochmal eingeben"
                  type={"password"}
                  name="checkPassword"
                  formsy
                  required={true}
                  style={styles.textField}
                />
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

export default ResetPassword;

