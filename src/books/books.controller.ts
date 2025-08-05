import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query('genre')
    genre?: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN',
  ) {
    return this.booksService.findAll(genre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    book: {
      name: string;
      author: string;
      genre: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN';
    },
  ) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateBook: {
      name: string;
      author: string;
      genre: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN';
    },
  ) {
    return this.booksService.update(+id, updateBook);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }
}
