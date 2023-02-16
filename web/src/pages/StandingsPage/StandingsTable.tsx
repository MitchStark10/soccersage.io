import { useAuth } from '@redwoodjs/auth';

import { Table } from 'src/components/Core/Table/Table';
import { Star } from 'src/components/Icons/Star';

interface StandingInfo {
    userId: string;
    score: number;
    email: string;
    username: string;
}

interface Props {
    standingsData: StandingInfo[];
}

const StarredUsername: React.VFC<{ username: string; currentUser }> = ({
    username,
    currentUser,
}) => {
    if (username === currentUser) {
        return (
            <div>
                <Star className="mr-2" />
                {username}
            </div>
        );
    }

    return <p>{username}</p>;
};

export const StandingsTable: React.VFC<Props> = ({ standingsData }) => {
    const { currentUser } = useAuth();

    const tableData = standingsData.map(({ username, score }, index) => [
        (index + 1).toString(),
        <StarredUsername
            key={username}
            username={username}
            currentUser={currentUser?.username}
        />,
        score.toString(),
    ]);

    return (
        <Table
            columnLabels={['Ranking', 'User', 'Points']}
            tableData={tableData}
        />
    );
};
