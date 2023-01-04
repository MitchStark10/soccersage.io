import classNames from 'classnames';

interface Props {
    className?: string;
    children: React.ReactNode;
}
export const UnorderedList: React.FC<Props> = ({ className, children }) => {
    return (
        <ul className={classNames('list-disc ml-8', className)}>{children}</ul>
    );
};
