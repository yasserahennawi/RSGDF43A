import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';

import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';

import * as Q from 'q';

export default class RequestResetPasswordCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  sendResetPasswordMailWithUrl(user, url) {
    console.log("Sending email with url `" + url + "` `" + user.firstName + "`");

    const mandrillOptions = {
      // @todo inject this instead
      token: process.env.MANDRILL_TOKEN,
      from: {
        name: 'TasteTastic Team',
        email: 'info@tastetastic.at',
      },
    }

    const transport = nodemailer.createTransport(mandrillTransport({
      auth: {
        apiKey: mandrillOptions.token
      }
    }));

    return Q.nfcall(transport.sendMail.bind(transport), {
      from: mandrillOptions.from.email,
      to: user.email,
      subject: 'Forgotten password reset',
      mandrillOptions: {
        template_name: 'reset-password',
        template_content: [],
        message: {
          global_merge_vars: [{
              "name": "firstname",
              "content": user.firstName
            }, {
              "name": "reseturl",
              "content": url,
            }],
        }
      }
    });
  }

  async execute(viewer, email, getResetPasswordUrl) {
    const key = this.guid();
    const url = getResetPasswordUrl(key);
    // Save in the database that the user with email is trying to reset password
    const user = await this.userRepository.requestResetPassword(viewer, email, key);
    await this.sendResetPasswordMailWithUrl(user, url);
    return user;
  }
}

IoC.singleton('requestResetPasswordCommand', ['userRepository'], RequestResetPasswordCommand);
