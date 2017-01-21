import React from 'react';
import { style } from 'glamor';

const PageHeader = (props) => {
  return (
    <div className={`${header}`}>
      <h1 className={`${title}`}>{props.title}</h1>

      {props.add ?
        <h4 className={`${subtitle}`}>
          {props.add}
          {props.addValue ?
            `: ${props.addValue}` : null
          }
        </h4> :
        null
      }

      {props.other ?
        <h4 className={`${subtitle}`}>
          {props.other}
          {props.otherValue ?
            `: ${props.otherValue}` : null
          }
        </h4> :
        null
      }

      {props.third ?
        <h4 className={`${subtitle}`}>
          {props.third}
          {props.thirdValue ?
            `: ${props.thirdValue}` : null
          }
        </h4> :
        null
      }
    </div>
  );
}

const header = style({
  marginBottom: 30,
});

const title = style({
  marginBottom: 0,
  fontSize: '2.3em',
  color: '#333333',
});

const subtitle = style({
  margin: 3,
  marginTop: 0,
  fontSize: '1.1em',
  color: '#515151',
});

export default PageHeader;
