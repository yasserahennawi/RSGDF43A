import request from 'superagent';

export function callApi() {
  request
    .post('/api/pet')
    .send({ name: 'Manny', species: 'cat' })
    .set('Accept', 'application/json')
    .end(function(err, res){
      // Calling the end function will send the request
    });
}
