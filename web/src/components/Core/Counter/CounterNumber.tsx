export const CounterNumber: React.FC = ({ children }) => {
    return (
        <span className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-white">
            {children}
        </span>
    );
};
