import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Query('genre')
    genre?: Prisma.EnumGenreFilter,
  ) {
    return this.booksService.findAll(genre);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(
    @Body()
    createBookDto: Prisma.BookCreateInput,
  ) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateBookDto: Prisma.BookUpdateInput,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
