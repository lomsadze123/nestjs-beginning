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
  Ip,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  private readonly logger = new MyLoggerService(BooksController.name);

  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('genre')
    genre?: Prisma.EnumGenreFilter,
  ) {
    this.logger.log(`Request from IP: ${ip}`);
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
