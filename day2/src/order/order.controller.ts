import { OrderService } from './order.service';
import { Body, Controller, Post, Req, UseGuards , Headers as NestHeaders } from '@nestjs/common';
import { CreateOrderStripeDto } from './dto/order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

import { Request } from 'express';

type RawBodyRequest<T> = T & { rawBody: Buffer };


@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}
@UseGuards(AuthGuard)
@Post('/stripe')
createStripe(@Body() OrderData:CreateOrderStripeDto , @Req() req:any){
    const user=req.user
    return this.orderService.createStripe(OrderData,user)
}

@Post('/completed')
createOrder(@Body() OrderData:CreateOrderStripeDto){
    return this.orderService.createOrder(OrderData)

}
@Post('webhook')
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @NestHeaders('stripe-signature') signature: string,
) {
    const rawBody = (req as any).body instanceof Buffer ? (req as any).body : (req as any).rawBody;
    return this.orderService.handleWebhook(rawBody, signature);
  }
}

