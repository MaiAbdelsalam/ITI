import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderStripeDto{
    @IsNumber({},{message:'amount must be number'})
    amount:number;
    @IsString({message:'user_id must be string'})
    @IsOptional()
    user_id?:string;
    @IsString({message:'user_id must be string'})
    @IsOptional()
    description?:string;
    @IsString({message:'urlSuccess must be string'})
    urlSuccess:string;
    @IsString({message:'urlCancel must be string'})
    urlCancel:string;
    @IsEmail({},{message:'string must be string and its invalid email'})
    customerEmail:string;
    @IsEnum(['EGP','USD','EUR','GBP'],{message:"Invalid Currency"})
    @IsOptional()
    currency:'EGP'|'USD'|'EUR'|'GBP'
    @IsString({message:'carrierCodeLogo must be string'})
    carrierCodeLogo:string;
}