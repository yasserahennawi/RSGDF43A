import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import {style} from 'glamor';
import Camera from 'components/image/Camera';
import Image from 'components/image/Image';
import { postImages } from 'helpers/uploader';
import { getUserToken } from 'helpers/storage';

export class CoverUpload extends React.Component {
  componentWillMount() {
    this.setState({ isLoading: false });
  }

  onDrop(images) {
    this.setState({ isLoading: true });
    this.props.onUploadStart(images);
    console.log("UPLOADING IMAGES", images);
    postImages(images, 'product', getUserToken())
      .then(images => {
        console.log('images', images);
        this.setState({ isLoading: false });
        this.props.onUploadSuccess(images);
      }).then(null, err => {
        console.log('error', err);
        this.setState({ isLoading: false });
        this.props.onUploadError(err);
      });
  }

  render() {
    let element;
    if(this.state.isLoading) {
      element = <CircularProgress />
    }
    else if(this.props.image && this.props.image.src) {
      element = <Image style={{ backgroundSize: 'cover' }} image={this.props.image} />
    }
    else {
      element = <Camera />
    }
    return (
      <div>
        <p
          {...style({
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.298039)',
            textTransform: 'uppercase',
          })}
          >Foto Hinzufügen</p>
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
            {element}
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default CoverUpload;
