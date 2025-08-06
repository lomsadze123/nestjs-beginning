import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsEnum(['FICTION', 'NON_FICTION', 'FANTASY', 'CLASSIC', 'DYSTOPIAN'], {
    message: 'Genre must be one of the predefined values',
  })
  genre: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN';
}
