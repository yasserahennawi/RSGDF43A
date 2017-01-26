import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import ProductList from 'components/products/ProductList';

class ListProductsRoute extends React.Component {
  render() {
    const {
      routes,
      params
    } = this.props;
    return (
      <div>
        <Breadcrumbs
          routes={routes}
          params={params}
          isAdmin={this.props.viewer.isAdmin}
        />
        <ProductList
          products={this.props.products}
          viewer={this.props.viewer}
        />
      </div>
    );
  }
}

export default Relay.createContainer(ListProductsRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        firstName
        lastName
        isAdmin
        ${ProductList.getFragment('viewer')}
      }
    `,
    products: () => Relay.QL`
      fragment on ProductConnection {
        ${ProductList.getFragment('products')}
      }
    `,
  }
});
