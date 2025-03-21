import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';

export class ResponseMessageDto {
  @IsArray()
  message: string[];

  @IsOptional() // O erro é opcional, pois não é necessário em todas as respostas
  @IsString()
  error?: string;

  @IsNumber()
  statusCode: number;
}
