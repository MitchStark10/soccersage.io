import { Link } from '@redwoodjs/router';

import { Text } from 'src/components/Core/Text/Text';

import { CounterNumber } from './CounterNumber';

interface Props {
    count: number;
    title: string;
    href?: string;
}

const CounterTitleContainer: React.FC<Pick<Props, 'href'>> = ({
    href,
    children,
}) => {
    if (href) {
        return <Link to={href}>{children}</Link>;
    }

    return <>{children}</>;
};

export const CounterContainer: React.FC<Props> = ({
    count,
    title,
    children,
    href,
}) => (
    <div className="mb-12">
        <div className="flex flex-row justify-start items-center">
            <CounterNumber>{count}</CounterNumber>
            <CounterTitleContainer href={href}>
                <Text As="h3" className="text-primary-dark ml-1 font-extrabold">
                    {title}
                </Text>
            </CounterTitleContainer>
        </div>
        <div className="text-xl items-center mt-4">{children}</div>
    </div>
);
