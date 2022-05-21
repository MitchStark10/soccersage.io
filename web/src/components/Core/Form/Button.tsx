import cn from 'classnames';

type Props = {
    variant: 'primary' | 'secondary';
} & React.ComponentProps<'button'>;

export const Button: React.FC<Props> = ({
    children,
    variant,
    className,
    ...rest
}) => {
    // TODO: Support for different button types;
    return (
        <button
            type="button"
            className={cn(
                ' focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ',
                {
                    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300':
                        variant === 'primary',
                    ' text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:ring-gray-200 border':
                        variant === 'secondary',
                },
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};
