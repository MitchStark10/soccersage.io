import React from 'react';

import { Text } from 'src/components/Core/Text/Text';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const StatCard: React.FC<Props> = ({ title, children }) => {
    return (
        <span className="flex flex-col justify-start items-start">
            <div>{title}</div>
            <Text As="h2" className="ml-0">
                {children}
            </Text>
        </span>
    );
};
