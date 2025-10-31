import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Types, Document } from "mongoose";
@Schema()
export class Orders extends Document{
    @Prop({required:true})
    amount:number;
    @Prop({required:true , ref:'User',type:Types.ObjectId})
    user_id:string;
    @Prop({required:true})
    urlSuccess:string;
    @Prop({required:true})
    urlCancel:string;
    @Prop({required:true})
    customerEmail:string;
    @Prop({required:true, enum:['EGP','USD','EUR','GBP'] , default:"EGP"})
    currency:'EGP'|'USD'|'EUR'|'GBP'
    @Prop({required:true})
    carrierCodeLogo:string;
    
}
export const OrdersSchema=SchemaFactory.createForClass(Orders)