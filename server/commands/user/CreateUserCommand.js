import IoC from 'AppIoC';
import ForbiddenError from 'errors/ForbiddenError';
import * as Q from 'q';

import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';


export default class CreateUserCommand {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }


  sendInvitationMail({ email, firstName, lastName, password }) {

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
      to: email,
      subject: 'Welcome',
      mandrillOptions: {
        template_name: 'tastetastic',
        template_content: [],
        message: {
          global_merge_vars: [{
              "name": "fname",
              "content": firstName
            }, {
              "name": "lname",
              "content": lastName
            }, {
              "name": "plainpassword",
              "content": password
            }, {
              "name": "email",
              "content": email,
            }],
        }
      }
    });
  }


  generateRandomPassword() {
    return Math.random().toString(36).substr(2, 6);
  }

  async execute(viewer, attrs) {
    if(! viewer.isAdmin()) {
      throw new ForbiddenError();
    }

    attrs.password = this.generateRandomPassword()

    // Send invitation email here
    const user = await this.userRepository.create(viewer, attrs);

    await this.sendInvitationMail(attrs);
    console.log(attrs);

    return user;
  }
}

IoC.singleton('createUserCommand', ['userRepository'], CreateUserCommand);
