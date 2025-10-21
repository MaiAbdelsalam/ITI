import { IsEmail, IsString,Length } from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(3 , 20,{message:"invalid length(it is between 3 & 20)"})
    // @Length(6, 20, { groups: ["update"] })
    readonly username: string;
    @IsEmail({},{message:"incorrect email"})
    readonly email: string;

}