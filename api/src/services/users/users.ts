import { db } from 'src/lib/db';
import type {
    QueryResolvers,
    MutationResolvers,
    UserResolvers,
} from 'types/graphql';

import nodemailer from 'nodemailer';

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
            return false;
        }

        // TODO: Figure out these environment variables
        // TODO: Figure out how this email should look
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.BOOTSTRAP_EMAIL,
            subject: 'Please Reset Your Passowrd',
            text: 'Reset your password here: TODO: Add Link',
        };

        // TODO: If an error occurs during the mail, what should happen?
        await transporter.sendMail(mailOptions);

        return true;
    };

export const User: UserResolvers = {
    predictions: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.id } }).predictions(),
};
