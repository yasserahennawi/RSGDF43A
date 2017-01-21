import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import SvgIcon from 'material-ui/SvgIcon';

import Profile from 'components/auth/Profile';
import AccountBank from 'components/auth/AccountBank';
import ProductList from 'components/products/ProductList';
import Accounting from 'components/auth/Accounting';

import Button from 'components/utils/Button';
import { FormattedDate } from 'react-intl';

class Account extends Component {
  state = {
    stepIndex: 0,
  };

  handleChangeStep = (type) => {
    return () => {
      const { stepIndex } = this.state;

      this.setState({
        stepIndex: (type === 'next') ? stepIndex + 1 : (stepIndex - 1 || 0),
      });
    };
  };

  renderIcon = (value, isAfter) => {
    return (
      <SvgIcon color={isAfter ? styles.icon.color : '#CCCCCC'}>
        <circle cx="12" cy="12" r="10" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fill="#fff"
        >
          {value}
        </text>
      </SvgIcon>
    );
  };

  renderStep = (value, title) => {
    const { stepIndex } = this.state;

    const isCurrent = stepIndex === (value-1);
    const isAfter = (stepIndex > (value -1) || isCurrent);
    return (
      <Step>
        <StepButton
          completed={true}
          style={styles.column}
          onClick={() => this.setState({ stepIndex: value - 1 })}
          icon={this.renderIcon(value, isAfter)}
          touchRippleColor="white"
          focusRippleColor="white"
          disableFocusRipple={true}
          disableKeyboardFocus={true}
            disableTouchRipple={true}
        >
          <span style={isCurrent ? styles.stepLabelCurrent : styles.stepLabel}>
            {title}
          </span>
        </StepButton>
      </Step>
    );
  };

  render() {
    const { stepIndex } = this.state;

    const steps = [
      <Profile handleChangeStep={this.handleChangeStep}
               onSubmit={ this.props.onSubmit }
               member={ this.props.member }
               isAdmin={ true }
               isShortCreationMode={ true } />,
      <AccountBank handleChangeStep={this.handleChangeStep} />,
      <ProductList handleChangeStep={this.handleChangeStep} />,
      <Accounting handleChangeStep={this.handleChangeStep} />,
    ];

    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.title}>{ this.props.member.first_name || 'Neue Mitglieder' }</h1>
          <h4 style={styles.subtitle}>{ this.props.member.type }</h4>
          <h4 style={styles.subtitle}>{'Registriert am: '}<FormattedDate value={ this.props.member.createdAt || new Date() } /></h4>
          <h4 style={styles.subtitle}>Anzahl von Specials: 0</h4>

          { !this.props.member.isNew?
            <div style={styles.buttons}>
              <Button
                labelColor="#E4E4E4"
                backgroundColor="#F4F4F4"
                label="AKZEPTIERT"
                style={{ marginRight: 15 }}
              />
              <Button
                labelColor="white"
                backgroundColor="#CE0A00"
                label="SPERREN"
              />
            </div> : null }
        </div>

        <Stepper
          linear={false}
          activeStep={stepIndex}
        >
          {this.renderStep(1, 'PROFILDATEN')}
          {this.renderStep(2, 'KONTODATEN HINZUFUGEN')}
          {this.renderStep(3, 'PRODUKTE')}
          {this.renderStep(4, 'ABRECHNUNG')}
        </Stepper>

        <div style={styles.container}>
          <div>
            {steps[stepIndex]}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    //marginTop: 30,
  },
  header: {
    marginBottom: 0,
  },
  title: {
    marginBottom: 0,
    color: '#333333',
    textTransform: 'uppercase',
  },
  subtitle: {
    margin: 3,
    marginTop: 0,
    color: '#515151',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 210,
    right: 40,
  },
  icon: {
    color: '#038ADF',
  },
  stepLabelCurrent: {
    color: '#1F90E1',
  },
  stepLabel: {
    color: '#D1D1D1',
  },
  stepButton: {
    height: 30,
  },
  column: {
    flexDirection: 'column'
  }
};

export default Account;
