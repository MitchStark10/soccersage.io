import { RedwoodGraphQLError } from '@redwoodjs/graphql-server';
import { db } from 'src/lib/db';
import type {
    QueryResolvers,
    MutationResolvers,
    PredictionResolvers,
} from 'types/graphql';

export const predictions: QueryResolvers['predictions'] = async (
    _temp,
    { context }
) => {
    // TODO: Figure this piece out
    console.log('testing', context.currentUser);

    return db.prediction.findMany({
        where: {
            userId: context.currentUser?.id as string,
        },
    });
};

export const prediction: QueryResolvers['prediction'] = ({ id }) => {
    return db.prediction.findUnique({
        where: { id },
    });
};

export const createPrediction: MutationResolvers['createPrediction'] = ({
    input,
}) => {
    return db.prediction.create({
        data: input,
    });
};

export const updatePrediction: MutationResolvers['updatePrediction'] = ({
    id,
    input,
}) => {
    return db.prediction.update({
        data: input,
        where: { id },
    });
};

export const deletePrediction: MutationResolvers['deletePrediction'] = ({
    id,
}) => {
    return db.prediction.delete({
        where: { id },
    });
};

// TODO: Consider adding a custom resolver for user info
export const Prediction: PredictionResolvers = {
    Team: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).Team(),
};
