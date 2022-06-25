export const CardGrid: React.FC = ({ children }) => {
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {children}
        </div>
    );
};
