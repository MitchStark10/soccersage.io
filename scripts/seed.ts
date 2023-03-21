import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';

const userSeedData: Prisma.UserCreateInput[] = [
    {
        email: 'some.email@gmail.com',
        username: 'some.email',
        hashedPassword: 'some.password',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email2@gmail.com',
        username: 'some.email2',
        hashedPassword: 'some.password2',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email3@gmail.com',
        username: 'some.email3',
        hashedPassword: 'some.password',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email4@gmail.com',
        username: 'some.email4',
        hashedPassword: 'some.password2',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email5@gmail.com',
        username: 'some.email5',
        hashedPassword: 'some.password',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email6@gmail.com',
        username: 'some.email6',
        hashedPassword: 'some.password',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email7@gmail.com',
        username: 'some.email7',
        hashedPassword: 'some.password2',
        salt: '123',
        roles: 'user',
    },
    {
        email: 'some.email8@gmail.com',
        username: 'some.email8',
        hashedPassword: 'some.password2',
        salt: '123',
        roles: 'user',
    },
];

export default async () => {
    for (const data of userSeedData) {
        console.log('creating user', data);
        await db.user.create({
            data,
        });
    }
};
