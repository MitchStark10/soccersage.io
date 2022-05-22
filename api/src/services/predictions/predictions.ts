import { db } from 'src/lib/db';
import type {
    QueryResolvers,
    MutationResolvers,
    PredictionResolvers,
} from 'types/graphql';

export const predictions: QueryResolvers['predictions'] = () => {
    return db.prediction.findMany();
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

export const Prediction: PredictionResolvers = {
    User: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).User(),
    Team: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).Team(),
};
