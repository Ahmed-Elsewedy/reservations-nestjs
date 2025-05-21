import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-emil.dto';

@Injectable()
export class NotificationsService {


  async notifyEmail({ email }: NotifyEmailDto) {
    console.log('---------->', email);
  }
}
