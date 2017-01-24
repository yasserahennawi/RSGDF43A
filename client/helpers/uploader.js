import * as superAgentRequest from 'superagent';
import * as Q from 'q';

let driveConfig = {
  bucket: '',
  endpoint: '',
};

export function getConfig() {
  return driveConfig;
}

export function setConfig({ bucket = '', endpoint = '' }) {
  driveConfig = { bucket, endpoint };
}

function formatImage(uploadedImages) {
  let formattedImage = {src: '', versions: []};

  // Set original src
  uploadedImages.forEach((image) => {
    if (image.original) {
      formattedImage.src = image.url;
    }
  });

  // Set versions
  uploadedImages.forEach((image) => {
    if (!image.original) {
      formattedImage.versions.push({
        src: image.url,
        width: image.width,
        height: image.height
      });
    }
  });

  return formattedImage;
}

export function postImage(file, type, token) {
  const { endpoint, bucket } = getConfig();

  if (!file) {
    return Q.reject("Files can't be empty");
  }

  if (!token) {
    return Q.reject("You have to set the token");
  }

  let req = superAgentRequest.post(endpoint.concat("/post-image"));
  let deferred = Q.defer();
  req.query({
    bucket: bucket,
    type: type
  });
  req.set('Authorization', `JWT ${token}`);
  req.set('Accept', 'application/json');
  req.attach(file.name, file);
  let callback = (err, res) => {
    if (err) {
      deferred.reject(res.body.error);
    } else {
      deferred.resolve(res.body);
    }
  }
  req.end(callback);
  return deferred.promise.then(response => {
    if (response.statusCode !== 200 && response.error) {
      return Q.reject(response.error);
    }

    return response.data;
  });
}

export function postImages(files, type, token) {
  let promises = files.map((file) => {
    return postImage(file, type, token)
    .then(formatImage);
  });

  return Q.all(promises);
}
