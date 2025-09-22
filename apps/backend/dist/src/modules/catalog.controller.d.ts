import { PrismaService } from 'src/infra/prisma.service';
export declare class CatalogController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<any>;
}
