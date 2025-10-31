import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { timeStamp } from 'console';
import { Request , Response} from 'express';
import { map, Observable, pipe } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request=context.switchToHttp().getRequest<Request>();
    const response=context.switchToHttp().getResponse<Response>()
    return next.handle().pipe(map((data:any)=>({
        success:true,
        statuscode:response.statusCode ,
        timeStamp:new Date().toISOString(),
        data:data as object
      
    })));
  }
}
