    import { fastify } from 'fastify';
    import { createTransaction } from './src/service.js';
    import { transactionRoutes } from './src/routes.js';

    const server = fastify();

    server.register(transactionRoutes)

    server.get ('/', () => {
        return "Olá mundo!";
    })

    server.listen ({
        port: 3333
    })