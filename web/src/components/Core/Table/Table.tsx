import classNames from 'classnames';

interface Props {
    columnLabels: string[];
    tableData: string[][];
    className?: string;
}
export const Table: React.VFC<Props> = ({
    columnLabels,
    tableData,
    className,
}) => {
    return (
        <div
            className={classNames(
                'relative overflow-x-auto shadow-md sm:rounded-lg',
                className
            )}
        >
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-light-gray">
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
                        <tr key={index} className="bg-white">
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
