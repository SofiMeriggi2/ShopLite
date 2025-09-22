import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';

@Controller('api/catalog')
export class CatalogController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.product.findMany({ orderBy: { title: 'desc' } });
  }
}
