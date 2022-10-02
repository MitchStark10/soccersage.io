import type { FindGames } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { Link, routes } from '@redwoodjs/router';

import Games from 'src/components/Game/Games';

export const QUERY = gql`
    query FindGames {
        games {
            id
            homeTeamId
            awayTeamId
            homeTeam {
                name
            }
            awayTeam {
                name
            }
            homeTeamScore
            awayTeamScore
            isCompleted
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No games yet. '}
            <Link to={routes.adminNewGame()} className="rw-link">
                {'Create one?'}
            </Link>
        </div>
    );
};

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ games }: CellSuccessProps<FindGames>) => {
    return <Games games={games} />;
};
