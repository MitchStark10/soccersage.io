import LoadingDots from '../Form/LoadingDots';
import { Text } from '../Text/Text';

export const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <Text variant="h3" className="m-3">
                Loading
            </Text>
            <LoadingDots className="bg-primary " />
        </div>
    );
};
