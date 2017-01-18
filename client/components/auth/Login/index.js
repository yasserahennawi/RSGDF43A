import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import { placeholder, style } from 'glamor';
import Formsy from 'formsy-react';

import {css} from 'glamor';

import theme from 'themes/main';
import styles from './styles';

import Logo from 'components/app/Logo';
import Copyright from 'components/app/Copyright';

import InputField from 'components/common/InputField';
import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';

class Login extends Component {
  state = {
    isFormValid: Boolean(false),
  };

  handleSnackbarConfirm = () => {
    this.props.updateSnack('')
  }

  toggleValidForm = (valid) => {
    return () => {
      this.setState({
        isFormValid: valid,
      });
    };
  };

  handleLogin = ( data ) => {
    if (this.state.isFormValid) this.props.onSubmit( data )
  };

  handleTerms = () => {
    this.setState({
      termsAcceptance: !this.state.termsAcceptance
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div className={css(styles.container)}>
          <div style={styles.logo}>
            <Logo />
          </div>
          <div className={css(styles.containerC)}>
            <Formsy.Form
              onValid={this.toggleValidForm(true)}
              onInvalid={this.toggleValidForm(false)}
              onValidSubmit={ this.handleLogin }
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
                    validationError="This is not a valid email"
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
                    onCheck={ this.handleTerms }
                  />
                </CardActions>

              </Card>
            </Formsy.Form>

          </div>
          <Snackbar
            open={!!this.props.snackbar}
            message={this.props.snackbar || ''}
            action="OK"
            autoHideDuration={7000}
            onActionTouchTap={this.handleSnackbarConfirm}
            onRequestClose={this.handleSnackbarConfirm}
          />
          <div style={styles.copyright}>
            <Copyright />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
