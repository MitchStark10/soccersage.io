import cn from 'classnames';

interface Props {
    className?: string;
}

export const H1: React.FC<Props> = ({ children, className }) => {
    return (
        <h1 className={cn(className, 'font-semibold text-4xl m-4 text-center')}>
            {children}
        </h1>
    );
};
