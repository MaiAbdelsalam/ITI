import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflactor:Reflector){}
  canActivate(
    context: ExecutionContext,
  ):  boolean | Promise<boolean> | Observable<boolean>  {
    const request=context.switchToHttp().getRequest<Request>()
      const user=request['user']
    const requiredRoles= this.reflactor.getAllAndOverride<string[]> ('roles',[
        context.getHandler(),
        context.getClass(),
    ])
    if(!requiredRoles.includes(user.role)) throw new ForbiddenException('you are not authorize to access this')
    return true;
  }
}
