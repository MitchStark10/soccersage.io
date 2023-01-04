export const CounterNumber: React.FC = ({ children }) => {
    return (
        <span className="mr-2 flex h-12 w-12 min-w-[3rem] items-center justify-center rounded-xl bg-primary-dark text-2xl text-white">
            {children}
        </span>
    );
};
