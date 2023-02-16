import { ReactNode } from 'react';

import classNames from 'classnames';

interface Props {
    columnLabels: string[];
    tableData: ReactNode[][];
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
                'overflow-x-auto shadow-md rounded-lg',
                className
            )}
        >
            <table className="w-full text-sm text-left">
                <thead className="text-sm uppercase bg-primary-dark text-white">
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
