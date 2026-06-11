    import { fastify } from 'fastify';
    import cors from '@fastify/cors';
    import { createTransaction } from './src/service.js';
    import { transactionRoutes } from './src/routes.js';

    const server = fastify();

    await server.register(cors, {
        origin: 'http://localhost:5173'
    });

    server.register(transactionRoutes)

    server.get ('/', () => {
        return "Olá mundo!";
    })

    server.listen ({
        port: 3333
    })