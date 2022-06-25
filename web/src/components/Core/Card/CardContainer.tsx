import classNames from 'classnames';

interface Props {
    className?: string;
}

export const CardContainer: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={classNames(
                'border-gray border rounded flex flex-col justify-start items-center w-full p-4',
                className
            )}
        >
            {children}
        </div>
    );
};
