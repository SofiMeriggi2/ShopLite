import { PrismaService } from 'src/infra/prisma.service';
export declare class CatalogController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        description: string;
        image: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        priceCents: number;
    }[]>;
}
