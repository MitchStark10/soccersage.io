import {
    AuthenticationError,
    ForbiddenError,
    RedwoodGraphQLError,
} from '@redwoodjs/graphql-server';
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types';
import { InferredCurrentUser } from '../../../.redwood/types/includes/all-currentUser';
import { db } from './db';

const ADMIN_EMAILS = ['mitchstark10@gmail.com', 'mitchell.stark@icloud.com'];

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */
export const getCurrentUser = async (session) => {
    const user = await db.user.findUnique({
        where: { id: session.id },
        select: { id: true, roles: true, email: true, username: true },
    });

    if (ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        user.roles = 'admin';
    }

    return user;
};

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!context.currentUser;
};

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
type AllowedRoles = string | string[] | undefined;

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: AllowedRoles - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: AllowedRoles): boolean => {
    if (!isAuthenticated()) {
        return false;
    }

    // Admin emails always return true
    const currentUserEmail = context.currentUser.email;
    if (ADMIN_EMAILS.includes(currentUserEmail.toLowerCase())) {
        return true;
    }

    const currentUserRole = context.currentUser?.roles;

    if (typeof roles === 'string') {
        return currentUserRole === roles;
    }

    if (Array.isArray(roles)) {
        return roles.some(
            (allowedRole) => context.currentUser?.roles === allowedRole
        );
    }

    //roles not found
    return false;
};

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: AllowedRoles - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles }: { roles: AllowedRoles }) => {
    if (!isAuthenticated()) {
        throw new AuthenticationError("You don't have permission to do that.");
    }

    if (roles && !hasRole(roles)) {
        throw new ForbiddenError("You don't have access to do that.");
    }
};

export const getFirstUserFromContext = (
    context: RedwoodGraphQLContext
): InferredCurrentUser => {
    if (!Array.isArray(context.currentUser)) {
        return context.currentUser as unknown as InferredCurrentUser;
    } else if (typeof context.currentUser[0] === 'object') {
        return context.currentUser[0] as unknown as InferredCurrentUser;
    }

    throw new RedwoodGraphQLError(
        'Unable to get first user from context: ' + JSON.stringify(context)
    );
};
