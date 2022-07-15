interface Props {
    className?: string;
}

export const Text: React.FC<Props> = ({ className, children }) => {
    return <p className={className}>{children}</p>;
};
