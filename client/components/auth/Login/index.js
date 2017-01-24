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

import LoginUserMutation from 'mutations/LoginUserMutation';
import {
  setUserToken,
  getFromStorage,
  setInStorage,
} from 'helpers/storage';

class Login extends Component {
  componentWillMount() {
    this.setState({
      isFormValid: false,
      termsAcceptance: false,
      errorMessage: '',
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

  loginSuccess({ login }) {
    setUserToken(login.viewer.token);
    setInStorage('notFirstTime', 'yes');
    window.location.href = '/';
  }

  loginFailure(err) {
    this.setState({
      errorMessage: "Wrong credentials",
    });
  }

  handleLogin({ email, password }) {
    if(!getFromStorage('notFirstTime') && ! this.state.termsAcceptance) {
      this.setState({
        errorMessage: "You have to accept terms",
      });
    }

    else if (this.state.isFormValid) {
      const mutation = new LoginUserMutation({
        email,
        password,
        viewer: this.props.viewer,
      });

      this.props.relay.commitUpdate(mutation, {
          onSuccess: this.loginSuccess.bind(this),
          onFailure: this.loginFailure.bind(this),
        }
      );
    }
  };

  handleTerms = () => {
    this.setState({
      termsAcceptance: !this.state.termsAcceptance
    })
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
            onValidSubmit={ this.handleLogin.bind(this) }
          >
            <Card style={styles.card}>
              <CardHeader
                title="Anmelden"
                textStyle={styles.titleText}
                style={styles.title}
              />
              <CardText style={styles.cardText}>
                <div style={styles.label}>
                  <span style={styles.spanText}></span>
                  <small></small>
                </div>
                <InputField
                  floatingLabelText="EMAIL-ADDRESSE ODER USERNAME"
                  name="email"
                  placeholder="Email-Adresse oder Username"
                  style={styles.textField}
                  formsy
                  required={true}
                  validations="isEmail"
                />
                <a href="#" style={styles.link}>Passwort vergessen?</a>
                <InputField
                  floatingLabelText="Dein Passwort"
                  type={"password"}
                  name="password"
                  formsy
                  required={true}
                  placeholder="******"
                  style={styles.textField}
                />
              </CardText>

              <CardActions
                style={styles.cardActions}
              >
                <Button
                  label="Anmelden"
                  type="submit"
                  primary={true}
                  style={styles.buttonContainer}
                  buttonStyle={styles.button}
                  labelStyle={styles.buttonLabel}
                  disabled={!this.state.isFormValid}
                />

                <Checkbox
                  style={styles.checkbox}
                  name="termsAcceptance"
                  label="Einstellungen speichern"
                  checked={ this.state.termsAcceptance }
                  onCheck={ this.handleTerms.bind(this) }
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

export default Relay.createContainer(Login, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        isGuest
        token
        ${LoginUserMutation.getFragment('viewer')}
      }
    `,
  }
});

