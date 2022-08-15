import { db } from 'src/lib/db';
import crypto from 'crypto';
import type {
    QueryResolvers,
    MutationResolvers,
    UserResolvers,
} from 'types/graphql';

import nodemailer from 'nodemailer';
import { RedwoodGraphQLError } from '@redwoodjs/graphql-server';
import { createDbAuthHandler } from 'src/functions/auth';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const users: QueryResolvers['users'] = () => {
    return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id }) => {
    return db.user.findUnique({
        where: { id },
    });
};

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
    return db.user.create({
        data: input,
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

export const sendResetPasswordEmail: MutationResolvers['sendResetPasswordEmail'] =
    async ({ email }) => {
        console.log('Received ID to email to reset: ' + email);

        const associatedUser = await db.user.findUnique({
            where: { email },
        });

        if (!associatedUser) {
            return {
                success: false,
            };
        }

        // TODO: Figure out how this email should look
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Please Reset Your Passowrd',
            text: 'Reset your password here: TODO: Add Link',
        };

        // TODO: If an error occurs during the mail, what should happen?
        await transporter.sendMail(mailOptions);

        return {
            success: true,
        };
    };

export const resetPassword: MutationResolvers['resetPassword'] = async (
    { id, resetToken, password },
    { context }
) => {
    const associatedUser = await db.user.findUnique({
        where: { id },
    });

    if (associatedUser.resetToken !== resetToken) {
        throw new RedwoodGraphQLError('Invalid id or reset token');
    }

    const authHandler = createDbAuthHandler(
        context.event,
        context.requestContext
    );

    const salt = crypto.randomBytes(16).toString('base64');
    const [hashedPassword] = authHandler._hashPassword(password, salt);

    return await db.user.update({
        where: {
            id,
        },
        data: {
            hashedPassword,
            salt,
            resetToken: null,
        },
    });
};

export const User: UserResolvers = {
    predictions: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).predictions(),
};
