import React from 'react';

import { H1 } from 'src/components/Core/Text/H1';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const StatCard: React.FC<Props> = ({ title, children }) => {
    return (
        <span className="flex flex-col justify-start items-start">
            <div className="uppercase">{title}</div>
            <H1 className="ml-0 my-2">{children}</H1>
        </span>
    );
};
