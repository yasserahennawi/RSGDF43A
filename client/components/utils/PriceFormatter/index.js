import React from 'react';
import Relay from 'react-relay';

export class PriceFormatter extends React.Component {
  render() {
    return (
      <div>
        {this.props.price.value} {this.props.price.currency}
      </div>
    );
  }
}

export default Relay.createContainer(PriceFormatter, {
  fragments: {
    price: () => Relay.QL`
      fragment on Price {
        value
        currency
      }
    `
  }
})
