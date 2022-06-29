import { db } from 'src/lib/db';
import type {
    QueryResolvers,
    MutationResolvers,
    SeasonResolvers,
} from 'types/graphql';

export const seasons: QueryResolvers['seasons'] = () => {
    return db.season.findMany();
};

export const season: QueryResolvers['season'] = ({ id }) => {
    return db.season.findUnique({
        where: { id },
    });
};

export const createSeason: MutationResolvers['createSeason'] = ({ input }) => {
    return db.season.create({
        data: input,
    });
};

export const updateSeason: MutationResolvers['updateSeason'] = ({
    id,
    input,
}) => {
    return db.season.update({
        data: input,
        where: { id },
    });
};

export const deleteSeason: MutationResolvers['deleteSeason'] = ({ id }) => {
    return db.season.delete({
        where: { id },
    });
};

export const Season: SeasonResolvers = {
    Prediction: (_obj, { root }) =>
        db.season.findUnique({ where: { id: root.id } }).Prediction(),
};
