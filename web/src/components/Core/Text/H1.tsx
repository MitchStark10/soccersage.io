import cn from 'classnames';

interface Props {
    className?: string;
    textAlign?: 'left' | 'center' | 'right';
}

export const H1: React.FC<Props> = ({
    children,
    className,
    textAlign = 'center',
}) => {
    return (
        <h1
            className={cn(
                className,
                `font-semibold text-4xl m-4 text-${textAlign}`
            )}
        >
            {children}
        </h1>
    );
};
