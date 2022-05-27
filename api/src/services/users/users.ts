import { RedwoodGraphQLError } from '@redwoodjs/graphql-server';
import { db } from 'src/lib/db';
import { encryptPassword } from 'src/lib/encryption-utils';
import {
    MutationResolvers,
    QueryResolvers,
    UserResolvers,
} from 'types/graphql';

export const users: QueryResolvers['users'] = () => {
    return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id }) => {
    if (id) {
        return db.user.findUnique({
            where: { id },
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
    const graphqlResult = await db.user.create({
        data: { hashedPassword, status: 'active', ...rest },
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

export const User: UserResolvers = {
    Prediction: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).Prediction(),
};
