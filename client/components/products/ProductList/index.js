import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import { css, style } from 'glamor';
import Button from 'components/utils/Button';
import Box from 'components/utils/Box';
import Product from 'components/products/Product';

const productContainer = style({
  //marginTop: 50,
  marginBottom: 20,
  display: 'flex',
  flexWrap: 'wrap',
});

class ProductList extends Component {
  render() {
    const { handleChangeStep } = this.props;

    return (
      <div style={styles.container}>
        <div className={`${productContainer}`}>
          {this.props.products.edges.map(({ node }, key) => (
            <Product
              cover={node.coverImage.src}
              key={`${key}`}
              onClick={() => this.props.router.push(`/books/${node.id}`)}
            >
            <div style={styles.productLabel}>
              <span style={styles.productLabelTitle}>
                {node.name}
                {node.isAdmin ?
                  <small style={styles.productLabelSmall}>
                    {node.creator.fullName}
                  </small> : null}
              </span>
              <div style={styles.productButtons}>
                <Box
                  style={styles.box}
                  boxes={[{
                    value: this.props.viewer.isAdmin ? 'JA' : '0',
                    text: this.props.viewer.isAdmin ? 'FREIGEBENE' : 'VERKAUFT',
                    valueStyle: styles.valueText,
                    textStyle: styles.boxText,
                    boxStyle: styles.boxStyle,
                  }, {
                    value: this.props.viewer.isAdmin ? 'Nein' : '0',
                    text: this.props.viewer.isAdmin ? 'NIGHT FREIGEBEN' : 'PREIS',
                  }]}
                />
              </div>
            </div>
            </Product>
          ))}
        </div>

        {/*<div style={styles.footer}>
          <div style={styles.formActions}>
            <Button
              label="ZURÜCK"
              style={{...styles.button, marginRight: 10}}
              onTouchTap={handleChangeStep('prev')}
            />

            <Button
              primary={true}
              label="WEITER"
              onTouchTap={handleChangeStep('next')}
            />
          </div>
        </div>*/}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
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
  productLabelTitle: {
    minHeight: 50,
  },
  productLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  productLabelSmall: {
    marginTop: 2,
    fontSize: 12,
  },
  box: {
    padding: '10px 0 5px 0',
  },
  boxStyle: {
    backgroundColor: '#96ED7F',
  },
  valueText: {
    marginTop: 5,
    color: '#16BB0C',
  },
  boxText: {
    marginTop: 5,
    color: '#16BB0C',
  },
};

export default Relay.createContainer(withRouter(ProductList), {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        isPublisher
        isBlogger
        isAdmin
      }
    `,
    products: () => Relay.QL`
      fragment on ProductConnection {
        edges {
          node {
            id
            name
            coverImage {
              src
            }
            creator {
              fullName
            }
          }
        }
      }

    `
  }
});
