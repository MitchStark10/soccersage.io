import { db } from 'src/lib/db';
import {
    MutationResolvers,
    QueryResolvers,
    UserResolvers
} from 'types/graphql';

export const users: QueryResolvers['users'] = () => {
    return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id }) => {
    return db.user.findUnique({
        where: { id },
    });
};

export const createUser: MutationResolvers['createUser'] = ({
    input: { password, status, ...rest },
}) => {
    if (status !== 'active' && status !== 'inactive') {
        throw new Error(
            'Invalid status. Only "active" or "inactive" are allowed.'
        );
    }
    // TODO: Actually hash password
    const hashedPassword = password + 'a';
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

    // TOOD: hashed password
    const hashedPassword = password + 'a';
    if (user && user.hashedPassword === hashedPassword) {
        return user;
    }

    return null;
};

export const User: UserResolvers = {
    Prediction: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).Prediction(),
};
