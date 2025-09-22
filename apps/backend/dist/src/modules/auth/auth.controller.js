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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infra/prisma.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let AuthController = class AuthController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(body) {
        const existing = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (existing) {
            throw new common_1.UnauthorizedException('El email ya está registrado');
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
    async login(body) {
        const user = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const valid = await bcrypt.compare(body.password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        return {
            token,
            user: { id: user.id, email: user.email, name: user.name },
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map