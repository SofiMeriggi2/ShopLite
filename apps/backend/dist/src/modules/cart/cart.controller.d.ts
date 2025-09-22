import { PrismaService } from 'src/infra/prisma.service';
export declare class CartController {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(req: any): Promise<any>;
    addToCart(req: any, body: {
        productId: string;
        quantity?: number;
    }): Promise<{
        message: string;
    }>;
    removeFromCart(req: any, body: {
        productId: string;
    }): Promise<{
        message: string;
    }>;
    checkout(req: any): Promise<{
        message: string;
        order?: undefined;
    } | {
        message: string;
        order: any;
    }>;
}
