import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import Button from 'components/utils/Button';
import BookList from 'components/books/BookList';
import Box from 'components/utils/Box';

class ProductList extends Component {
  renderCoverChildren = () => {
    return (
      <div style={styles.bookLabel}>
        <span>
          Pipilangstrumbfhose Beispiel Text
          <small style={styles.bookLabelSmall}>
            Benjamin Combos
          </small>
        </span>
        <div style={styles.bookButtons}>
          <Box
            style={styles.box}
            boxes={[{
              value: 'JA',
              text: 'freigebene',
              valueStyle: styles.valueText,
              textStyle: styles.boxText,
              boxStyle: styles.boxStyle,
            }, {
              value: 'Nein',
              text: 'night freigeben',
            }]}
          />
        </div>
      </div>
    );
  };

  render() {
    const { handleChangeStep } = this.props;

    const books = [
      {
        coverImage: 'http://gbbdf.org/wp-content/uploads/2015/07/Pippi-Longstocking.jpg',
        children: this.renderCoverChildren(),
      },
      {
        coverImage: 'http://www.tolkienbooks.net/images/main/hobbit-2001-hb.gif',
        children: this.renderCoverChildren(),
      },
      {
        coverImage: 'https://s-media-cache-ak0.pinimg.com/736x/3d/1d/e8/3d1de873d83e37a9134ed752c18ff57e.jpg',
        children: this.renderCoverChildren(),
      },
      {
        coverImage: 'http://gbbdf.org/wp-content/uploads/2015/07/Pippi-Longstocking.jpg',
        children: this.renderCoverChildren(),
      },
      {
        coverImage: 'http://www.tolkienbooks.net/images/main/hobbit-2001-hb.gif',
        children: this.renderCoverChildren(),
      },
      {
        coverImage: 'https://s-media-cache-ak0.pinimg.com/736x/3d/1d/e8/3d1de873d83e37a9134ed752c18ff57e.jpg',
        children: this.renderCoverChildren(),
      },
    ];

    return (
      <div style={styles.container}>
        <BookList books={books} />

        {/*<div style={styles.footer}>
          <div style={styles.formActions}>
            <Button
              label="Back"
              style={{...styles.button, marginRight: 10}}
              onTouchTap={handleChangeStep('prev')}
            />

            <Button
              primary={true}
              label="Continue"
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
  bookLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  bookLabelSmall: {
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

export default ProductList;
