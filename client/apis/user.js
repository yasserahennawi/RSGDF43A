import request from 'superagent';
import * as Q from 'q';

const sendRequest = req => {
  const deferred = Q.defer();
  req.end(function(err, res){
    if(err) {
      deferred.reject(res.body);
    } else {
      deferred.resolve(res);
    }
  });
  return deferred.promise;
}

export function requestResetPassword(email) {
  return sendRequest(request
    .post('/api/v1/user/request-reset-password')
    .send({ email })
    .set('Accept', 'application/json'));
}

export function resetPassword(key, password) {
  return sendRequest(request
    .post('/api/v1/user/reset-password')
    .send({ key, password })
    .set('Accept', 'application/json'));
}
