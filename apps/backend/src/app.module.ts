import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from './infra/prisma.module';
import { AuthController } from './modules/auth/auth.controller';
import { CartController } from './modules/cart/cart.controller';
import { CatalogController } from './modules/catalog.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule, // 👈 ahora sí PrismaService está disponible
  ],
  controllers: [AuthController, CartController, CatalogController],
})
export class AppModule {}
