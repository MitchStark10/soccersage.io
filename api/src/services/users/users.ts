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
import { generateResetPasswordToken } from 'src/lib/generate-reset-password-token';
import { addDays } from 'date-fns';

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
        const lowerCaseEmail = email.toLowerCase();
        console.log('Received ID to email to reset: ' + lowerCaseEmail);

        const associatedUser = await db.user.findUnique({
            where: { email: lowerCaseEmail },
        });

        if (!associatedUser) {
            console.log('Could not find associated user');
            return {
                success: false,
                message: 'Could not find user with email: ' + lowerCaseEmail,
            };
        }

        const resetToken = generateResetPasswordToken(16);

        await db.user.update({
            where: { email: lowerCaseEmail },
            data: { resetToken, resetTokenExpiresAt: addDays(new Date(), 1) },
        });

        console.log('Prepping mail options');
        const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: lowerCaseEmail,
            subject: 'Please Reset Your Passowrd',
            text: `You are receiveing this because you have requested to reseet your password at <domain name>.
            Please click on the following link, or paste this into your browser to complete the process:
            ${resetPasswordLink}.

            If you did not request this, please respond to ${process.env.EMAIL_USER} and delete the email.}`,
        };

        console.log('Sending reset password email');
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            const errorMessage =
                'An unknown error occurred when sending reset password email: ' +
                error;
            console.error(errorMessage);
            return {
                success: false,
                message: errorMessage,
            };
        }
        console.log('Reset password email sent');

        return {
            success: true,
            message:
                'An email has been sent to: ' +
                lowerCaseEmail +
                '. Please check your inbox.',
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
