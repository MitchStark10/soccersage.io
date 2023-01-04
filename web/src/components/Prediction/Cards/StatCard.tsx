import React from 'react';

import { Text } from 'src/components/Core/Text/Text';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const StatCard: React.FC<Props> = ({ title, children }) => {
    return (
        <span className="flex flex-col justify-start items-start">
            <div className="uppercase">{title}</div>
            <Text As="h6" className="ml-0 my-2">
                {children}
            </Text>
        </span>
    );
};
