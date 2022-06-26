import { Link } from '@redwoodjs/router';
import cn from 'classnames';

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    variant: 'primary' | 'secondary' | 'tertiary';
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
    const { className, ...rest } = props;
    const compiledClassname = cn(
        ' focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center',
        {
            'text-white bg-primary hover:bg-secondary focus:ring-gray':
                props.variant === 'primary',
            ' text-black bg-white border-gray hover:border-primary hover:text-primary focus:ring-gray border':
                props.variant === 'secondary',
            'opacity-75': props.as !== 'a' && props.disabled,
        },
        className
    );

    if (rest.as === 'a') {
        const { children, ...linkRest } = rest;
        return (
            <Link className={compiledClassname} {...linkRest}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={compiledClassname}
            type={rest.type || 'button'}
            {...rest}
        />
    );
};
