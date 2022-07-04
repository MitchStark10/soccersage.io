import { Table } from 'src/components/Core/Table/Table';

interface StandingInfo {
    userId: string;
    score: number;
}

interface Props {
    standingsData: StandingInfo[];
}
export const StandingsTable: React.VFC<Props> = ({ standingsData }) => {
    const tableData = standingsData.map(({ userId, score }, index) => [
        (index + 1).toString(),
        userId,
        score.toString(),
    ]);
    return (
        <Table
            columnLabels={['Ranking', 'User ID', 'Points']}
            tableData={tableData}
        />
    );
};
