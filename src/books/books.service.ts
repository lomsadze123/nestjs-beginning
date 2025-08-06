import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(genre?: Prisma.EnumGenreFilter) {
    if (genre)
      return this.databaseService.book.findMany({
        where: {
          genre,
        },
      });

    return this.databaseService.book.findMany();
  }

  findOne(id: number) {
    return this.databaseService.book.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createBookDto: Prisma.BookCreateInput) {
    return this.databaseService.book.create({
      data: createBookDto,
    });
  }

  update(id: number, updateBookDto: Prisma.BookUpdateInput) {
    return this.databaseService.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
  }

  remove(id: number) {
    return this.databaseService.book.delete({
      where: {
        id,
      },
    });
  }
}
