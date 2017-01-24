import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import {style} from 'glamor';
import Camera from 'components/image/Camera';
import Image from 'components/image/Image';
import { postImages } from 'helpers/uploader';
import { getUserToken } from 'helpers/storage';

export class CoverUpload extends React.Component {
  onDrop(images) {
    console.log("UPLOADING IMAGES", images);
    postImages(images, 'product', getUserToken())
      .then(images => {
        console.log('images', images);
        this.props.onUploadSuccess(images);
      }).then(null, err => {
        console.log('error', err);
        this.props.onUploadError(err);
      });
  }

  render() {
    return (
      <div>
        <p
          {...style({
            transform: 'scale(0.75) translate(0px, -28px)',
            color: 'rgba(0, 0, 0, 0.298039)',
            textTransform: 'uppercase',
          })}
          >Foto hinzuüfügen</p>
        <Dropzone style={{border:'none'}} onDrop={this.onDrop.bind(this)}>
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
            })}>
            {this.props.image && this.props.image.src ?
              <Image image={this.props.image} /> : <Camera />}
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default CoverUpload;
