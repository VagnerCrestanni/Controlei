import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { transactionRoutes, goalRoutes } from './src/routes.js';

    const server = fastify();

    await server.register(cors, {
        origin: 'http://localhost:5173'
    });

    server.register(transactionRoutes)

    server.register(goalRoutes)

    server.get ('/', () => {
        return "Olá mundo!";
    })

    server.listen ({
        port: 3333
    })