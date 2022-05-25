import {
    AuthenticationError,
    RedwoodGraphQLError,
} from '@redwoodjs/graphql-server';
import { db } from 'src/lib/db';
import {
    comparePasswordToHash,
    encryptPassword,
    generateKey,
} from 'src/lib/encryption-utils';
import { logger } from 'src/lib/logger';
import {
    MutationResolvers,
    QueryResolvers,
    UserResolvers,
} from 'types/graphql';

export const users: QueryResolvers['users'] = () => {
    return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id, sessionCookie }) => {
    if (id) {
        return db.user.findUnique({
            where: { id },
        });
    } else if (sessionCookie) {
        return db.user.findUnique({
            where: { sessionCookie },
        });
    }

    throw new RedwoodGraphQLError(
        'You must provide either an id or a sessionCookie'
    );
};

export const createUser: MutationResolvers['createUser'] = async ({
    input: { password, ...rest },
}) => {
    const hashedPassword = await encryptPassword(password);
    const sessionCookie = generateKey();
    const graphqlResult = await db.user.create({
        data: { hashedPassword, status: 'active', sessionCookie, ...rest },
    });

    // TODO: set the cookie

    return graphqlResult;
};

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
    return db.user.update({
        data: input,
        where: { id },
    });
};

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
    return db.user.delete({
        where: { id },
    });
};

export const login: MutationResolvers['login'] = async ({
    email,
    password,
}) => {
    console.log('Received!');

    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        logger.debug('Unable to find user with email: ' + email);
        throw new AuthenticationError('Incorrect username or password.');
    }

    console.log('comparing', { password, hashedPass: user.hashedPassword });

    if (await comparePasswordToHash(password, user.hashedPassword)) {
        // The user's email and password matched, so generate the new session cookie and return the user info
        const sessionCookie = generateKey();

        await db.user.update({
            data: { sessionCookie },
            where: { id: user.id },
        });

        return user;
    }

    logger.debug('Passwords did not match');
    throw new AuthenticationError('Incorrect username or password.');
};

export const signOut: MutationResolvers['signOut'] = ({ email }) => {
    return db.user.update({ data: { sessionCookie: '' }, where: { email } });
};

export const User: UserResolvers = {
    Prediction: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).Prediction(),
};
