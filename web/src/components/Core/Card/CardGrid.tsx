import classNames from 'classnames';
import { ClassNameProps } from 'types/class-name-props';

export const CardGrid: React.FC<ClassNameProps> = ({ children, className }) => {
    return (
        <div
            className={classNames(
                'grid gap-5 grid-cols-1 max-w-2xl mx-auto',
                className
            )}
        >
            {children}
        </div>
    );
};
