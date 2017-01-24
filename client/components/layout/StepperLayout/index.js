import React from 'react';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import styles from './styles';
import SvgIcon from 'material-ui/SvgIcon';
import SelectField from 'components/utils/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class StepperLayout extends React.Component {
  renderIcon(value, isAfter) {
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

  renderStep (value, title) {
    const { stepIndex, onStepChange } = this.props;

    const isCurrent = stepIndex === (value-1);
    const isAfter = (stepIndex > (value -1) || isCurrent);
    return (
      <Step key={value}>
        <StepButton
          completed={true}
          style={styles.column}
          onClick={() => onStepChange(value - 1)}
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
    return (
      <div>
        <Breadcrumbs
          routes={this.props.breadcrumbs}
          params={[]}
        />
        <div style={styles.header}>
          <div style={styles.leftPanel}>
            <h1 style={styles.title}>{this.props.title}</h1>
            <h4 style={styles.subtitle}>{this.props.subtitle}</h4>
          </div>
          <div style={styles.rightPanel}>
            {this.props.rightPanel}
          </div>
        </div>
        <Stepper
          linear={false}
          activeStep={this.props.stepIndex}>
          {this.props.steps.map((step, index) => this.renderStep(index + 1, step))}
        </Stepper>
        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
