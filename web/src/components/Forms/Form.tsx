import cn from 'classnames';

type Props = {
    className?: string;
} & React.ComponentProps<'form'>;

export const Form: React.FC<Props> = ({
    children,
    className,
    onSubmit,
    ...rest
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    return (
        <form
            className={cn(
                'border-gray-300 rounded-lg md:w-1/2 m-auto grid gap-y-4 items-center max-w-lg',
                className
            )}
            onSubmit={handleSubmit}
            {...rest}
        >
            {children}
        </form>
    );
};
