import { BadRequestException,Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UsersService } from './users.service';
import { User } from './user.shema';
import { TransformResponseInterceptor } from 'src/transform-response/transform-response.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('users')
export class UsersController {
    constructor(public userService:UsersService){}
    @Roles('admin')
    @UseGuards(AuthGuard,RolesGuard)
    @Get('/')
    async getAll() : Promise<User[]>{
        return await this.userService.getAll()
    }
    @UseInterceptors(TransformResponseInterceptor)
    @Get(':id')
    async getById(@Param('id',ParseUUIDPipe) id:string): Promise<User>{
        return await this.userService.getById(id)
    }
    // @Get()
    // find():UserEntity[]{
    //     return this.users
    // }

//   @Get(':id')
//     findOne(@Param("id") id:string): UserEntity | undefined {
//     const user: UserEntity | undefined= this.users.find((user) => user.id === id);
//     if(user){
//         return user
//     }
//     else{
//         throw new BadRequestException('User not exist');

//     }    }
// @HttpCode(HttpStatus.OK)
// @UseInterceptors(TransformResponseInterceptor)
//   @Post()
//   async create(@Body() createUserDto:CreateUserDto): Promise<User> {
//     return await this.userService.createUser(createUserDto);
//   }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateUserDto): Promise<User>{
    return await this.userService.update(id,body)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id:string){
    return await this.userService.delete(id)
  }
    // @Patch(':id')
    // update(@Param("id") id:string, @Body() updateUserDto:UpdateUserDto):UpdateUserDto{
    //     const index = this.users.findIndex((user) => user.id == id);
    //     if(index >-1){
    //     const updatedUser = { ...this.users[index], ...updateUserDto };
    //     return updatedUser;
    //     }
    //     else{
    //         throw new BadRequestException('User not exist');

    //     }
    // }
    // @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // delete(@Param("id") id:string ){

    //     const index = this.users.findIndex((user) => user.id == id);
    //     if(index > -1){
    //         this.users.splice(index,1)

    //     }
    //     else{
    //         throw new BadRequestException('User not exist');

    //     }
    // }

}
