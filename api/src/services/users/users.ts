import { db } from 'src/lib/db';
import {
    comparePasswordToHash,
    encryptPassword,
} from 'src/lib/encryption-utils';
import {
    MutationResolvers,
    QueryResolvers,
    UserResolvers,
} from 'types/graphql';

export const users: QueryResolvers['users'] = () => {
    return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id }) => {
    return db.user.findUnique({
        where: { id },
    });
};

export const createUser: MutationResolvers['createUser'] = async ({
    input: { password, status, ...rest },
}) => {
    if (status !== 'active' && status !== 'inactive') {
        throw new Error(
            'Invalid status. Only "active" or "inactive" are allowed.'
        );
    }

    const hashedPassword = await encryptPassword(password);
    return db.user.create({
        data: { hashedPassword, status, ...rest },
    });
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
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Incorrect username or password.');
    }

    if (await comparePasswordToHash(password, user.hashedPassword)) {
        return user;
    }

    throw new Error('Incorrect username or password.');
};

export const User: UserResolvers = {
    Prediction: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).Prediction(),
};
