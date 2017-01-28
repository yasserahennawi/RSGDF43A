import React, { Component } from 'react';
import Relay from 'react-relay';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';
import UpdateUserMutation from 'mutations/UpdateUserMutation';

import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';
import EditBlock from 'components/utils/EditBlock';

class EditUserPayment extends Component {
  toggleValidForm = (valid) => {
    return () => {
      this.setState({
        isSubmitButtonValid: valid,
      });
    };
  };

  submitForm = (data) => {
    const { handleChangeStep } = this.props;

    handleChangeStep('next')();
  };

  render() {
    const { handleChangeStep } = this.props;

    return (
      <div style={styles.container}>
        <Formsy.Form
          onValid={this.toggleValidForm(true)}
          onInvalid={this.toggleValidForm(false)}
          onValidSubmit={this.submitForm}
        >
        <EditBlock>
          <InputField
            name="bankdaten"
            floatingLabelText="BANKDATEN"
            hintText="IBAN-Nr."
            formsy
            validations="isExisty"
            validationError={errorMessage}
            required={true}
            style={styles.textField}
          />

          <InputField
            name="bic"
            hintText="BIC"
            formsy
            validations="isExisty"
            validationError={errorMessage}
            required={true}
            style={styles.textField}
          />

          <InputField
            name="bankName"
            hintText="Name der Bank"
            formsy
            validations="isExisty"
            validationError={errorMessage}
            required={true}
            style={styles.textField}
          />
      </EditBlock>
          {/*<div style={styles.footer}>
            <div style={styles.formActions}>
              <Button
                label="ZURÜCK"
                style={{ ...styles.button, marginRight: 10 }}
                onTouchTap={handleChangeStep('prev')}
              />

              <Button
                primary={true}
                type="submit"
                label="WEITER"
              />
            </div>
          </div>*/}
        </Formsy.Form>
      </div>
    );
  }
}

const errorMessage = 'This field should be filled';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 30,
  },
  textField: {
    width: '100%',
    margin: '10px 0',
  },
  select: {
    marginLeft: 30,
  },
  footer: {
    //display: 'flex',
  },
  formActions: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
  },
};


export default Relay.createContainer(EditUserPayment, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
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

