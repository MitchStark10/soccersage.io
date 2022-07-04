import { Table } from 'src/components/Core/Table/Table';

interface StandingInfo {
    userId: string;
    score: number;
    email: string;
}

interface Props {
    standingsData: StandingInfo[];
}
export const StandingsTable: React.VFC<Props> = ({ standingsData }) => {
    const tableData = standingsData.map(({ email, score }, index) => [
        (index + 1).toString(),
        email,
        score.toString(),
    ]);
    return (
        <Table
            columnLabels={['Ranking', 'User', 'Points']}
            tableData={tableData}
        />
    );
};
