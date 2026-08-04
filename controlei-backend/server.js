import { fastify } from 'fastify'; 
import cors from '@fastify/cors';
import { transactionRoutes, goalRoutes } from './src/routes.js';

    const server = fastify({
        logger: true
    });

    await server.register(cors, {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173', //FRONTEND_URL é a variável de ambiente que armazena a URL do front end, caso não exista, será usado o valor padrão 'http://localhost:5173'
    });

    server.register(transactionRoutes)

    server.register(goalRoutes)

    server.get ('/', () => {
        return "Olá mundo!";
    })

    server.listen ({
        host: '0.0.0.0',
        port: process.env.PORT || 3333
    }, (err)=> {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    })