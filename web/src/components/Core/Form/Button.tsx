import cn from 'classnames';

import { Link } from '@redwoodjs/router';

import LoadingDots from './LoadingDots';

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    loading?: boolean;
};

type ButtonAsButton = BaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
        as?: 'button';
    };

type ButtonAsExternal = BaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
        as: 'a';
        to: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsExternal;

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, children, loading, ...rest } = props;

    const isDisabled = props.as === 'button' && (props.disabled ?? loading);

    const compiledClassname = cn(
        ' focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center',
        {
            'text-white bg-primary focus:ring-gray':
                props.variant === 'primary',
            ' text-black bg-white border-gray hover:border-secondary-dark hover:text-secondary-dark focus:ring-gray border':
                props.variant === 'secondary',
            'opacity-75': isDisabled,
        },
        className
    );

    if (rest.as === 'a') {
        return (
            <Link className={compiledClassname} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={compiledClassname}
            type={rest.type || 'button'}
            disabled={isDisabled}
            {...rest}
        >
            {loading ? <LoadingDots /> : children}
        </button>
    );
};
