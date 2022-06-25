import cn from 'classnames';

interface Props {
    className?: string;
}

export const H6: React.FC<Props> = ({ children, className }) => {
    return (
        <h6 className={cn(className, 'font-semibold m-4 text-center')}>
            {children}
        </h6>
    );
};
