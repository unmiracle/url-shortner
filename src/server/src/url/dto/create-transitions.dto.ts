import { IsIP, IsString, IsUUID } from 'class-validator';

export class CreateTransitionDto {
  @IsIP()
  ip: string;

  @IsUUID()
  urlId: string;
}
