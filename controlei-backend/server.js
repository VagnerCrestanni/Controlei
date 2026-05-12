    import { fastify } from 'fastify';

    const server = fastify();

    server.get ('/', () => {
        return "Olá mundo!";
    })

    server.listen ({
        port: 3333
    })