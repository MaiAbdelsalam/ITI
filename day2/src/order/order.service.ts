import { BadRequestException, Injectable } from '@nestjs/common';
import { Orders } from './order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderStripeDto } from './dto/order.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
    private stripe: Stripe;
    private endpointSecret:string; // مفتاح الـ webhook بتاعك
    public  session
    constructor(@InjectModel(Orders.name) private OrderModel:Model<Orders> , private configService: ConfigService){
      this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!);
      this.endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!;
    }
    
    async createStripe(orderData:CreateOrderStripeDto ,user:any ): Promise<any>{
         this.session = await this.stripe.checkout.sessions.create({
            line_items: [
              {
                price_data:{
                    currency:'egp',
                    unit_amount:Math.round(orderData.amount * 100),
                    product_data:{
                        name:"nestjs",
                        description:orderData.description,
                        images:[orderData.carrierCodeLogo]
                    }
                },
                // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: orderData.urlSuccess,
            cancel_url: orderData.urlCancel,
            //ملحوظه انا اخدت بيانات اليوز من الداتا اللي رجعتلي في الرسبونس لما عمل تسجيل دخول او انشاء حساب جديد
            client_reference_id:user.id,
            customer_email:orderData.customerEmail,
          });        
          return this.session
        // or
        //   return session.url
        // بعد ما العمليه تمت ودخلنا علي ال url 
        //وانشأنا عمليه دفع نقدر مدخل علي اللينك الاتي عشان اشوف عمليات الدفع بتاعتي علي stripe
        // https://dashboard.stripe.com/acct_1SNlgf6wW5aziJad/test/payments

        //عشان تعمل ريكوست هتكتب بوست مان

        //{
//     "amount":400,
//     "description":"this id desc",
//     "urlSuccess":"https://done.com",
//     "urlCancel":"https://cancel.com",
//     "customerEmail":"email@email.com",
//     "carrierCodeLogo":"image1234
// }

    }

// //////////////////////


    createOrder(s){
        console.log('hello')
    }

    async handleWebhook(rawBody: Buffer, signature: string) {
        try {
          const event = this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            this.endpointSecret,
          );
      
          console.log(' Webhook verified successfully!');
          console.log('Event type:', event.type);
      
          if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
      
            console.log(' Payment successful, creating order...');
      
            await this.OrderModel.create({
              amount: (session.amount_total ?? 0) / 100,
              user_id: session.client_reference_id,
              urlSuccess: session.success_url ?? '',
              urlCancel: session.cancel_url ?? '',
              customerEmail: session.customer_email ?? '',
              currency: (session.currency ?? 'EGP').toUpperCase(),
              carrierCodeLogo: session.metadata?.carrierCodeLogo ?? 'default.png',
            });
      
            console.log(' Order saved successfully after payment.');
          }
      
          return { received: true };
        } catch (err) {
          console.error(' Webhook Error:', err.message);
          throw new BadRequestException('Webhook signature verification failed.');
        }
      }
      
    
}