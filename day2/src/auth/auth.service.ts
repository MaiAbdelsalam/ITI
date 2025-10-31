import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.shema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User> , private readonly jwtService:JwtService){}
    async signup(body) : Promise<Partial<User>>{
       return await this.userModel.create({...body,
        password: await bcrypt.hash(body.password,10)
        ,role:'user'})
    }
    async login(body) : Promise<any> {
        const user= await this.userModel.findOne({email:body.email})
        if(!user){
            throw new BadRequestException()
        }
        const isPasswordValid=await bcrypt.compare(body.password,user.password)
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credintail')
        const payload={id:user._id,email:user.email,role:user.role}

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
