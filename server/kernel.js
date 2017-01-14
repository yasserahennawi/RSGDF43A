import mongoose from 'mongoose';
import IoC from './IoC';
import glob from 'glob';
import path from 'path';
import * as Q from 'q';

// Mongodb connection
const configureDatabase = () => {
  // For backwards compatibility, Mongoose 4 returns mpromise promises by default.
  // Plugging in your own Promises Library (i.e.: Q.Promise)
  mongoose.Promise = Q.Promise;
  return mongoose.createConnection('mongodb://127.0.0.1:27017/tastic');
}

// Register connection
IoC.callable('connection', [], configureDatabase);

// Require all files to register themselves
glob.sync( path.join(__dirname, './@(models|api|repositories|auth|commands|graphql|errors)/**/*.js') ).forEach( function( file ) {
  require( path.resolve( file ) );
});

export default () => {
  // Use Jwt encoder decoder
  IoC.same('encoderDecoder', 'jwtEncoderDecoder');

  // Use token authentication
  IoC.same('authManager', 'tokenAuth');

  console.log(process.env.SECRET_KEY);

  // Register secret key
  IoC.value('secretKey', process.env.SECRET_KEY);
}

