"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infra/prisma.service");
const jwt_auth_guard_1 = require("../common/jwt-auth.guard");
let CartController = class CartController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(req) {
        const userId = req.user.sub;
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } },
        });
        return cart !== null && cart !== void 0 ? cart : { items: [] };
    }
    async addToCart(req, body) {
        var _a;
        const userId = req.user.sub;
        const quantity = (_a = body.quantity) !== null && _a !== void 0 ? _a : 1;
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
        }
        else {
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
    async removeFromCart(req, body) {
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
    async checkout(req) {
        const userId = req.user.sub;
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } },
        });
        if (!cart || cart.items.length === 0) {
            return { message: 'El carrito está vacío' };
        }
        const totalCents = cart.items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);
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
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        const fullOrder = await this.prisma.order.findUnique({
            where: { id: order.id },
            include: { items: { include: { product: true } } },
        });
        return {
            message: '🎉 Compra realizada con éxito',
            order: fullOrder,
        };
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "checkout", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartController);
//# sourceMappingURL=cart.controller.js.map