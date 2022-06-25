import cn from 'classnames';

interface Props {
    className?: string;
}

export const ErrorText: React.FC<Props> = ({ children, className }) => {
    return (
        <p className={cn('mt-2 text-sm text-error-red', className)}>
            {children}
        </p>
    );
};
