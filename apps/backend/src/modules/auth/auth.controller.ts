import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  async register(@Body() body: { email: string; name: string; password: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashed,
      },
    });

    return { message: 'Usuario registrado', user: { id: user.id, email: user.email } };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: body.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return {
    token,
    user: { id: user.id, email: user.email, name: user.name },
  };
  }
}
