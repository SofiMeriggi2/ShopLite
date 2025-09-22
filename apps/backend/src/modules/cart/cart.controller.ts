import { Body, Controller, Get, Post, Delete, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private prisma: PrismaService) {}

  // 👉 Obtener carrito del usuario logueado
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.sub;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return cart ?? { items: [] };
  }

  // 👉 Agregar producto al carrito
  @Post('add')
  async addToCart(
    @Req() req,
    @Body() body: { productId: string; quantity?: number }
  ) {
    const userId = req.user.sub;
    const quantity = body.quantity ?? 1;

    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: body.productId },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: body.productId,
          quantity,
        },
      });
    }

    return { message: '✅ Producto añadido al carrito' };
  }

  // 👉 Eliminar producto del carrito
  @Delete('remove')
  async removeFromCart(@Req() req, @Body() body: { productId: string }) {
    const userId = req.user.sub;

    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      return { message: 'El carrito está vacío' };
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId: body.productId },
    });

    return { message: '🗑️ Producto eliminado del carrito' };
  }

  // 👉 Checkout
  @Post('checkout')
  async checkout(@Req() req) {
    const userId = req.user.sub;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return { message: 'El carrito está vacío' };
    }

    const totalCents = cart.items.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0
    );

    // Creamos la orden con items
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalCents,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.product.priceCents,
          })),
        },
      },
    });

    // Limpiamos el carrito
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Traemos la orden completa con los productos
    const fullOrder = await this.prisma.order.findUnique({
      where: { id: order.id },
      include: { items: { include: { product: true } } },
    });

    return {
      message: '🎉 Compra realizada con éxito',
      order: fullOrder,
    };
  }
}
