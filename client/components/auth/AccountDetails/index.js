import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';

import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';

import UserDetails from 'components/auth/UserDetails';

class AccountDetails extends Component {
  state = {
    isSubmitButtonValid: false,
  };

  toggleValidForm = (valid) => {
    return () => {
      this.setState({
        isSubmitButtonValid: valid,
      });
    };
  };

  submitForm = (data) => {
    const { handleChangeStep } = this.props;
    if ( this.props.member.isNew ) {
      this.props.onSubmit( data )
    } else {
      if ( this.props.onSubmit ) {
        this.props.onSubmit( data, handleChangeStep('next') );
      } else {
        handleChangeStep('next')();
      }
    }
  };

  handleTypeSelectChange = (e, value, index) => {
    this.setState({
      memberType: value
    })
    this.props.member.type = value
  }

  render() {
    const { handleChangeStep } = this.props;

    return (
      <div style={styles.container}>
        <UserDetails
          member={ this.props.member }
          memberType={ (this.props.member || {}).type || 'blogger' }
          typeChange={ this.handleTypeSelectChange }
          isAdmin={ this.props.isAdmin }
          isShortCreationMode={ this.props.isShortCreationMode }
          toggleValidForm={this.toggleValidForm}
          submitForm={this.submitForm}
          onBackButtonClick={handleChangeStep('prev')}
          isSubmitButtonValid={ this.state.isSubmitButtonValid }
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
  },
  textField: {
    width: '100%',
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

export default AccountDetails;
