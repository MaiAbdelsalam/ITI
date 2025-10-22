import { IsEmail, IsInt, IsOptional, IsString,Length, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(3 , 20,{message:"invalid length(it is between 3 & 20)"})
    // @Length(6, 20, { groups: ["update"] })
     name: string;
    @IsEmail({},{message:"incorrect email"})
     email: string;
    @IsString({message:"incorrect password"})
    @MinLength(8)
     password: string;
    @IsOptional()
    @IsInt({message:'Age must br an integer'})
    age:number

}