import { Check } from 'src/components/Icons/Check';

import { Pill, PillProps } from './Pill';

interface Props {
    variant: PillProps['variant'];
}

export const CheckPill: React.FC<Props> = ({ variant }) => {
    return (
        <Pill variant={variant} className="py-[2px] rounded-circle px-[5px]">
            <Check />
        </Pill>
    );
};
