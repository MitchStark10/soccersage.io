import { db } from 'src/lib/db';
import type {
    QueryResolvers,
    MutationResolvers,
    TeamResolvers,
} from 'types/graphql';

export const teams: QueryResolvers['teams'] = () => {
    return db.team.findMany();
};

export const team: QueryResolvers['team'] = ({ id }) => {
    return db.team.findUnique({
        where: { id },
    });
};

export const createTeam: MutationResolvers['createTeam'] = ({ input }) => {
    return db.team.create({
        data: input,
    });
};

export const updateTeam: MutationResolvers['updateTeam'] = ({ id, input }) => {
    return db.team.update({
        data: input,
        where: { id },
    });
};

export const deleteTeam: MutationResolvers['deleteTeam'] = ({ id }) => {
    return db.team.delete({
        where: { id },
    });
};

export const Team: TeamResolvers = {
    Prediction: (_obj, { root }) =>
        db.team.findUnique({ where: { id: root.id } }).Prediction(),
    homeTeamGames: (_obj, { root }) =>
        db.team.findUnique({ where: { id: root.id } }).homeTeamGames(),
    awayTeamGames: (_obj, { root }) =>
        db.team.findUnique({ where: { id: root.id } }).awayTeamGames(),
};
