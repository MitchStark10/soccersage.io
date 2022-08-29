import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClassNameProps } from 'types/class-name-props';

export const Person: React.VFC<ClassNameProps> = ({ className }) => {
    return <FontAwesomeIcon icon={faUser} className={className} />;
};
