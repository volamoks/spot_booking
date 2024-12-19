declare module '@auth/prisma-adapter' {
    import { Adapter } from 'next-auth/adapters';
    import { PrismaClient } from '@prisma/client';

    function PrismaAdapter(client: PrismaClient): Adapter;
    export { PrismaAdapter };
}
