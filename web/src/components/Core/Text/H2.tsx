import { FC } from 'react';
import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string;
}

export const H2: FC<Props> = ({ children, className }) => (
    <h2
        className={twMerge(
            cn('font-semibold text-2xl m-4 text-center', className)
        )}
    >
        {children}
    </h2>
);
