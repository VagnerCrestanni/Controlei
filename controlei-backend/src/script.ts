import { prisma } from "../lib/prisma.js"; 

async function getUsers() {
    const users = await prisma.user.findMany
    console.log(users);
}

getUsers();