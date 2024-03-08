import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseDTO } from '../response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(
      new ResponseDTO({
        statusCode: status,
        error: this.validateError(error),
        timestamp: new Date().toISOString(),
        path: request.url,
      }),
    );
  }

  private validateError(error: any): string[] {
    const response: string[] = [];
    if (error.message instanceof Array) {
      error.message.forEach((element: string) => {
        response.push(element);
      });
    } else {
      response.push(error.message || error);
    }
    return response;
  }
}
