import React from 'react';
import Relay from 'react-relay';

export class RecipeItems extends React.Component {
  render() {
    console.log('recipeItems', this.props.items);
    return (
      <div>
        <ol>
          {this.props.items.edges.map(({ node }) => (
            <li>{node.ingredient.name} {node.quantity} {node.unit}</li>
          ))}
        </ol>
      </div>
    );
  }
}


export default Relay.createContainer(RecipeItems, {
  fragments: {
    items: () => Relay.QL`
      fragment on RecipeItemConnection {
        edges {
          node {
            ingredient {
              id
              name
            }
            quantity
            unit
          }
        }
      }
    `
  }
})
