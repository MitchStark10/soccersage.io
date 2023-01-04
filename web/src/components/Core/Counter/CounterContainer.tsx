import { H2 } from '../Text/H2';

import { CounterNumber } from './CounterNumber';

interface Props {
    count: number;
    title: string;
}

export const CounterContainer: React.FC<Props> = ({
    count,
    title,
    children,
}) => (
    <div className="mb-4">
        <div className="flex flex-row justify-start items-center">
            <CounterNumber>{count}</CounterNumber>
            <H2 className="text-primary-dark ml-1">{title}</H2>
        </div>
        <div className="text-xl items-center px-16">{children}</div>
    </div>
);
