import { Body, Controller, HttpCode,HttpStatus, Post, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/user.shema';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
@Controller('auth')
export class AuthController {
    constructor(public authService:AuthService , public userService:UsersService){}
    @HttpCode(HttpStatus.OK)
    // @Post('signin')
    @Post('signup')
    async signup(@Body() body:CreateUserDto): Promise<Partial<User>>{
        return await this.userService.createUser(body);   
    }
    @Post('login')
    async login(@Body() body:SigninDto): Promise<Partial<User>>{
        return await this.authService.login(body);   
    }
    // async signup(@Param('id') id:CreateUserDto): Promise<User>{
    //     return await this.userService.getById(body);   
    // }

}
