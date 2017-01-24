import React from 'react';
var LOADED_IMAGE_SRCS = [];

export default class Image extends React.Component {

  static propTypes = {
    image: React.PropTypes.shape({
      /**
       * Original image src
       */
      src: React.PropTypes.string.isRequired,
      /**
       * Original width
       */
      width: React.PropTypes.number,
      /**
       * Original height
       */
      height: React.PropTypes.number,
      /**
       * Image versions array
       */
      versions: React.PropTypes.arrayOf(React.PropTypes.shape({
        /**
         * Version src
         */
        src: React.PropTypes.string.isRequired,
        /**
         * Version width
         */
        width: React.PropTypes.number.isRequired,
        /**
         * Version height
         */
        height: React.PropTypes.number.isRequired
      }))
    }),
    /**
     * force width for image
     */
    width: React.PropTypes.number,
    /**
     * force height for image
     */
    height: React.PropTypes.number,

    /**
     * Class name
     */
    className: React.PropTypes.string,
    /**
     * Style object
     */
    style: React.PropTypes.object,
    /**
     * Whether to use <img /> tag or not
     */
    useImgTag: React.PropTypes.bool,
    useSpinner:React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    loaderClassName: React.PropTypes.string,
  };
  static defaultProps = {
    useSpinner: true,
    isVisible: true
  };
  componentWillMount() {
    this.setState({
      width: 0,
      height: 0,
      image: null
    });
  }

  callOnLoadListener() {
    if(this.props.onLoad && typeof this.props.onLoad === 'function') {
      this.props.onLoad();
    }
  }

  selectAndLoadImage(props, state) {
    this.setState({ image: props.image });
    this.callOnLoadListener();
    // let image = this.getNearestVersion(
    //   state.width,
    //   state.height,
    //   props.image,
    //   props.resolutionMargin
    // );
    // if(LOADED_IMAGE_SRCS.indexOf(image.src) > -1) {
    //   this.setState({ image });
    //   this.callOnLoadListener();
    // } else {
    //   let img = new Image();
    //   img.src = image.src;
    //   img.onload = () => {
    //     LOADED_IMAGE_SRCS.push(image.src);
    //     this.callOnLoadListener();
    //     this.setState({ image });
    //   };
    // }
  }

  componentWillUpdate(nextProps, nextState) {
    if(! nextProps.image) {
      return;
    }

    if(nextState.width !== this.state.width || nextState.height !== this.state.height) {
      this.selectAndLoadImage(nextProps, nextState);
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if(! nextProps.image) {
      return;
    }

    if(nextProps.image !== this.props.image) {
      this.selectAndLoadImage(nextProps, this.state);
    }
  }

  hasVersions(image) {
    return image && image.versions && image.versions.length > 0;
  }

  getNearestVersion(width, height, image, resolutionMargin = 0) {
    if(! width || !height) {
      return image;
    }
    if(! this.hasVersions(image)) {
      return image;
    }

    let smallestDiffVersion = image;
    let smallestDiff = 100000;

    for (var i = 0; i < image.versions.length; i++) {
      let version = image.versions[i];

      if(version.width < (width + resolutionMargin)
        || version.height < (height + resolutionMargin)) {
        continue;
      }

      let diff = (version.width - width + resolutionMargin)
        + (version.height - height + resolutionMargin);

      if(diff < smallestDiff) {
        smallestDiff = diff;
        smallestDiffVersion = version;
      }
    }

    return smallestDiffVersion;
  }

  getImageDivStyle(image) {
    return Object.assign({}, this.props.style, {
      backgroundImage: `url(${image.src})`,
      backgroundPosition: 'center',
      width: this.props.width || "100%",
      height: this.props.height || '100%'
    });
  }

  getImageTagStyle(image) {
    return Object.assign({}, this.props.style, {
      display: 'block',
      width: this.props.width || "100%",
      height: this.props.height || '100%'
    });
  }

  getPreloadStyle() {
    return Object.assign({}, this.props.style, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: this.props.width || "100%",
      height: this.props.preloadHeight || this.props.height || '100%'
    });
  }

  refDimensionDetector(ref) {
    if(! ref) {
      return;
    }

    if(ref.clientWidth !== this.props.width && ref.clientWidth !== this.state.width) {
      this.setState({
        width: this.props.width || ref.clientWidth,
        height: this.props.height || ref.clientHeight
      });
    }
  }

  render() {
    let result;

    if(! this.state.image) {
      result = <div
          ref={this.refDimensionDetector.bind(this)}
          className={this.props.className}
          style={this.getPreloadStyle()}><span className={this.props.loaderClassName}></span></div>
    }
    else if(this.props.useImgTag) {
      result =
          <img
            ref={this.refDimensionDetector.bind(this)}
            className={this.props.className}
            src={this.state.image.src}
            style={this.getImageTagStyle(this.state.image)} />
    } else {
      result = <div
          ref={this.refDimensionDetector.bind(this)}
          className={this.props.className}
          onClick={this.props.onClick}
          style={this.getImageDivStyle(this.state.image)}>{this.props.children}</div>
    }

    return (
        result
    );
  }
}
