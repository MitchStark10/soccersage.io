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
    const compiledClassname = cn(
        ' focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ',
        {
            'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300':
                props.variant === 'primary',
            ' text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:ring-gray-200 border':
                props.variant === 'secondary',
            'opacity-75': props.as !== 'a' && props.disabled,
        },
        props.className
    );

    if (props.as === 'a') {
        const { children, ...rest } = props;
        return (
            <Link className={compiledClassname} {...rest}>
                {children}
            </Link>
        );
    }

    return <button className={compiledClassname} {...props} />;
};
