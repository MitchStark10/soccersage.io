import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClassNameProps } from 'types/class-name-props';

export const Star: React.FC<ClassNameProps> = ({ className }) => (
    <FontAwesomeIcon className={className} icon={faStar} />
);
