import { Injectable , BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.shema';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { UpdateUserDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}
    async getAll() : Promise<User[]>{
        return await this.userModel.find()
    }
    async getById(id:string) :Promise<User>{
        const user: User | null = await this.userModel.findById(id)
        if(!user){
            throw new NotFoundException('user not found')
        }
        else return user
    }
   async createUser(body:CreateUserDto) : Promise<User> {
    const user=await this.userModel.findOne({email:body.email})
    if(user){
        throw new BadRequestException('User already exists');
    }
    else{
        const hashedPassword=await bcrypt.hash(body.password,10)
        return await  this.userModel.create({...body ,password:hashedPassword ,role:'user'})
        }
    }
    async update(id:string,body:UpdateUserDto) : Promise<User>{
    
        const user : User | null=await this.userModel.findByIdAndUpdate(id,{...body},{new:true})
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
}
    async delete(id:string){
        const user : User | null= await this.userModel.findByIdAndDelete(id)
        if(!user){
            throw new NotFoundException('user not found')
        }
    }
    async getUserByEmail(email :string) : Promise<User>{
        const user=await this.userModel.findOne({email})
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

}
