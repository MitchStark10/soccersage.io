import { FC } from 'react';
import cn from 'classnames';

interface Props {
    className?: string;
}

export const H2: FC<Props> = ({ children, className }) => (
    <h2 className={cn(className, 'font-semibold text-2xl m-4 text-center')}>
        {children}
    </h2>
);
