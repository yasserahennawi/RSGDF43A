import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';

class ListProductsRoute extends React.Component {
  render() {
    const {
      routes,
      params
    } = this.props;
    console.log(this.props.products);
    return (
      <div>
        <Breadcrumbs
          routes={routes}
          params={params}
          isAdmin={this.props.viewer.isAdmin}
        />
        <ul>
        {this.props.products.edges.map(({ node }, index) => (
          <li key={index}>
            {node.name}
             <a href={`/books/${node.id}`}>Edit</a>
          </li>
        ))}
        </ul>
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
      }
    `,
    products: () => Relay.QL`
      fragment on ProductConnection {
        edges {
          node {
            id
            name
            creator {
              firstName
            }
          }
        }
      }
    `,
  }
});
