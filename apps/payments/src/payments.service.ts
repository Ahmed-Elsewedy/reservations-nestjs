import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: ClientProxy
  ) { }

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-10-28.acacia'
    }
  );

  createCharge({ amount, card, email }: PaymentsCreateChargeDto) {
    console.log('===========here============');

    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   confirm: true,
    //   payment_method: 'pm_card_visa',
    //   currency: 'usd'
    // })

    // this.notificationService.emit('email_notify', { email })
    return 'paymentIntent';
  }
}
