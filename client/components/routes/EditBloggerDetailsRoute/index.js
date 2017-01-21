import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import EditUserDetails from 'components/auth/EditUserDetails';
import EditUserPayment from 'components/auth/EditUserPayment';
import ProductList from 'components/products/ProductList';
import styles from './styles';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import SvgIcon from 'material-ui/SvgIcon';
import { FormattedDate } from 'react-intl';

class EditBloggerDetailsRoute extends React.Component {

  componentWillMount() {
    this.setState({
      stepIndex:  0,
    })
  }

  onUserUpdateSuccess({ user }) {
    this.setState({
      stepIndex: 1,
    })
  }

  getUserDetails() {
    return (
      <EditUserDetails
        user={this.props.user}
        viewer={this.props.viewer}
        onUserUpdateSuccess={this.onUserUpdateSuccess.bind(this)}
      />
    );
  }

  getPaymentDetails() {
    return (
      <EditUserPayment />
    );
  }

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

  getProductList() {
    return (
      <ProductList />
    );
  }

  getInvoiceList() {

  }


  render() {
    const {
      routes,
      params
    } = this.props;
    return (
      <div>
        <Breadcrumbs
          routes={routes}
          params={{ userId: this.props.user.fullName }}
        />
        <div style={styles.header}>
          <h1 style={styles.title}>{ this.props.user.fullName }</h1>
          <h4 style={styles.subtitle}>{ this.props.user.userType }</h4>
          <h4 style={styles.subtitle}>{'Registriert am: '}<FormattedDate value={this.props.user.createdAt} /></h4>
          <h4 style={styles.subtitle}>Anzahl von Specials: { this.props.user.totalProducts }</h4>
        </div>
        <Stepper
          linear={false}
          activeStep={this.state.stepIndex}>
          {this.renderStep(1, 'PROFILDATEN')}
          {this.renderStep(2, 'KONTODATEN HINZUFUGEN')}
          {this.renderStep(3, 'PRODUKTE')}
          {this.renderStep(4, 'ABRECHNUNG')}
        </Stepper>
        <div style={styles.container}>
          <div>
            {this.state.stepIndex === 0 ? this.getUserDetails() : null}
            {this.state.stepIndex === 1 ? this.getPaymentDetails() : null}
            {this.state.stepIndex === 2 ? this.getProductList() : null}
            {this.state.stepIndex === 3 ? this.getInvoiceList() : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(EditBloggerDetailsRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${EditUserDetails.getFragment('viewer')}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        fullName
        userType
        totalProducts
        createdAt
        ${EditUserDetails.getFragment('user')}
      }
    `,
  }
});
