import { db } from 'src/lib/db';
import type {
    GameResolvers, MutationResolvers, QueryResolvers
} from 'types/graphql';

export const games: QueryResolvers['games'] = () => {
    return db.game.findMany();
};

export const game: QueryResolvers['game'] = ({ id }) => {
    return db.game.findUnique({
        where: { id },
    });
};

export const createGame: MutationResolvers['createGame'] = ({ input }) => {
    return db.game.create({
        data: input,
    });
};

export const updateGame: MutationResolvers['updateGame'] = ({ id, input }) => {
    return db.game.update({
        data: input,
        where: { id },
    });
};

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
    return db.game.delete({
        where: { id },
    });
};

export const Game: GameResolvers = {
    homeTeam: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).homeTeam(),
    awayTeam: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).awayTeam(),
};
