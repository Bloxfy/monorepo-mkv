import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiErrorResponse = (status: HttpStatus, message: string) =>
  ApiResponse({
    status,
    schema: {
      example: {
        statusCode: status,
        message,
        error: message,
      },
    },
  });