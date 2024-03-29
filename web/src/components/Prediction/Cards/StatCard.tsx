import React from 'react';

import { Text } from 'src/components/Core/Text/Text';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const StatCard: React.FC<Props> = ({ title, children }) => {
    return (
        <span className="grid grid-cols-2 items-center gap-4 sm:grid-cols-1 sm:gap-0">
            <div>{title}</div>
            <Text As="h2" className="ml-0">
                {children}
            </Text>
        </span>
    );
};
