import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';

@Controller('catalog')
export class CatalogController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.product.findMany({ orderBy: { title: 'asc' } });
  }

  @Get(':slug')
  async bySlug(@Param('slug') slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }
}
