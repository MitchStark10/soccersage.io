import { Alignment } from 'types/alignment';
import { Team } from 'types/graphql';

import { Text } from 'src/components/Core/Text/Text';

interface Props {
    team: Team;
    imageFocus: 'left' | 'right';
    align: Alignment;
}

export const TeamText: React.FC<Props> = ({ team, imageFocus, align }) => {
    return (
        <Text textAlign={align}>
            {imageFocus === 'left' && team.logoUrl && (
                <img src={team.logoUrl} alt={team.name} />
            )}
            {team.name}
            {imageFocus === 'right' && team.logoUrl && (
                <img src={team.logoUrl} alt={team.name} />
            )}
        </Text>
    );
};
