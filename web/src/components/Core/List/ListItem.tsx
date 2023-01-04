import classNames from 'classnames';

import { ChildrenClassNameProps } from 'src/utils/types/children-classname-props';

export const ListItem: React.FC<ChildrenClassNameProps> = ({
    className,
    children,
}) => {
    return <li className={classNames(className, 'text-left')}>{children}</li>;
};
