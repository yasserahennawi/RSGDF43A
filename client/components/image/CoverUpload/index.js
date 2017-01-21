import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import {style} from 'glamor';
import Camera from 'components/image/Camera';

const CoverUpload = (props) => {
  return (
    <div>
      <p
        {...style({
          transform: 'scale(0.75) translate(0px, -28px)',
          color: 'rgba(0, 0, 0, 0.298039)',
          textTransform: 'uppercase',
        })}
        >Foto hinzuüfügen</p>
      <Dropzone
          style={{border:'none'}}
        >
        <div
          {...style({
            width: 230,
            height: 300,
            background: '#eaeaea',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'grab',
          })}
          >
            <Camera />
          </div>
      </Dropzone>
    </div>
);
}
export default CoverUpload;
