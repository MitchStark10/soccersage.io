interface Props {
    columnLabels: string[];
    tableData: string[][];
}
export const Table: React.VFC<Props> = ({ columnLabels, tableData }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        {columnLabels.map((label, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowText, index) => (
                        <tr key={index} className="bg-white border-b">
                            {rowText.map((cellText, cellIndex) => (
                                <th
                                    key={cellIndex}
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {cellText}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
