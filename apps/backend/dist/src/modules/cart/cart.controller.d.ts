import { PrismaService } from 'src/infra/prisma.service';
export declare class CartController {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(req: any): Promise<({
        items: ({
            product: {
                description: string;
                image: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                title: string;
                priceCents: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            cartId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | {
        items: any[];
    }>;
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
        order: {
            items: ({
                product: {
                    description: string;
                    image: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    slug: string;
                    title: string;
                    priceCents: number;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                quantity: number;
                priceCents: number;
                orderId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalCents: number;
        };
    }>;
}
