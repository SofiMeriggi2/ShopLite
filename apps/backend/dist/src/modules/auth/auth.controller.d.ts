import { PrismaService } from 'src/infra/prisma.service';
export declare class AuthController {
    private prisma;
    constructor(prisma: PrismaService);
    register(body: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            id: any;
            email: any;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
}
