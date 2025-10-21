import { BadRequestException,Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';


@Controller('users')
export class UsersController {
   private readonly users:UserEntity[]=[]
    @Get()
    find():UserEntity[]{
        return this.users
    }

  @Get(':id')
    findOne(@Param("id") id:string): UserEntity | undefined {
    const user: UserEntity | undefined= this.users.find((user) => user.id === id);
    if(user){
        return user
    }
    else{
        throw new BadRequestException('User not exist');

    }    }

  @Post()
  create(@Body() createUserDto:CreateUserDto): CreateUserDto {
    const find=this.users.find((user)=> user.email==createUserDto.email)
    if(find){
        throw new BadRequestException('Email already exists');
    }
    else{
    const newUser: UserEntity={
        ...createUserDto,
        id:uuid()
    }
    this.users.push(newUser)
        return newUser;
    }}
    
    @Patch(':id')
    update(@Param("id") id:string, @Body() updateUserDto:UpdateUserDto):UpdateUserDto{
        const index = this.users.findIndex((user) => user.id == id);
        if(index >-1){
        const updatedUser = { ...this.users[index], ...updateUserDto };
        return updatedUser;
        }
        else{
            throw new BadRequestException('User not exist');

        }
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id:string ){

        const index = this.users.findIndex((user) => user.id == id);
        if(index > -1){
            this.users.splice(index,1)

        }
        else{
            throw new BadRequestException('User not exist');

        }
    }

}
