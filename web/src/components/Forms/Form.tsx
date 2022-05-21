import cn from 'classnames';

interface Props {
    className?: string;
}

export const Form: React.FC<Props> = ({ children, className }) => {
    return (
        <form
            className={cn(
                'border-gray-300 rounded-lg w-1/2 m-auto grid gap-y-4 items-center max-w-lg',
                className
            )}
        >
            {children}
        </form>
    );
};
