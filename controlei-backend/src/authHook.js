export async function authHook ( request, reply ) { //Hook de autenticação para verificar se o usuário está autenticado antes de acessar rotas protegidas
    try {
        await request.jwtVerify()
    } catch (error) {
        reply.status(401).send({ error: 'Unauthorized' })
    }
}