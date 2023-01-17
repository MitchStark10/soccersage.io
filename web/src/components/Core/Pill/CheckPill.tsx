import { Check } from 'src/components/Icons/Check';

import { Pill, PillProps } from './Pill';

interface Props {
    variant: PillProps['variant'];
}

export const CheckPill: React.FC<Props> = ({ variant }) => {
    return (
        <Pill variant={variant} className="py-0.5 rounded-circle px-[6px]">
            <Check />
        </Pill>
    );
};
