import { useAuth } from '@redwoodjs/auth';
import { Table } from 'src/components/Core/Table/Table';

interface StandingInfo {
    userId: string;
    score: number;
    email: string;
    username: string;
}

interface Props {
    standingsData: StandingInfo[];
}

export const StandingsTable: React.VFC<Props> = ({ standingsData }) => {
    const { currentUser } = useAuth();

    const tableData = standingsData.map(({ username, score }, index) => [
        (index + 1).toString(),
        username,
        score.toString(),
    ]);

    const currentUserStandingsData = tableData.find(
        ([, username]) => username === currentUser.username
    );

    const tableDataToShow = tableData.slice(0, 10);

    if (
        currentUserStandingsData &&
        parseInt(currentUserStandingsData[0]) > 10
    ) {
        tableDataToShow.push(...[['...'], currentUserStandingsData, ['...']]);
    }

    return (
        <Table
            columnLabels={['Ranking', 'User', 'Points']}
            tableData={tableDataToShow}
        />
    );
};
