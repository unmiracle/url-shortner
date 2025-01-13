import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  alias?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  expiresAt: string;
}
