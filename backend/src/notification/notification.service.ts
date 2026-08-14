import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class NotificationService {
    private transport;

    constructor(
        private readonly configService : ConfigService
    ){
        this.transport = createTransport({
            service:"gmail",
            auth:{
                user:configService.get('userMail'),
                pass:configService.get('userMailPassKey')
            }
        })
    }

     async notifyMail(userEmail:string){
          try {
            const html = `
            <p>you have new message at insta app</p>`;

            const info = await this.transport.sendMail({
                from : `${this.configService.get('userMail')}`,
                to:userEmail,
                subject:'notification from insta',
                html:html
            })
           
         return info;
          } catch (error) {
            throw new InternalServerErrorException("notification not send")
          }
       }
}
