import { Key } from './../../node_modules/sift/lib/utils.d';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


interface JwtPayload{
  id:string;
  email?:string;
  role : string
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public readonly jwtService:JwtService){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>   {
    const request = context.switchToHttp().getRequest<Request>();
    const [type,token] =request.headers.authorization?.split(' ') ?? []
    if(type !=='Bearer') throw new UnauthorizedException('invalid authorization header')
     
      const payload=await this.jwtService.verifyAsync<JwtPayload>(token)
      request['user']={...payload}
    return true;
  }

}
