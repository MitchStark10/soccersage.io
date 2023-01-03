import classNames from "classnames";
import { ClassNameProps } from "types/class-name-props";

export const CardGrid: React.FC<ClassNameProps> = ({ children, className }) => {
    return (
        <div className={classNames("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
            {children}
        </div>
    );
};
