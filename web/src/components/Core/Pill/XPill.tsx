import { X } from 'src/components/Icons/X';

import { Pill, PillProps } from './Pill';

interface Props {
    variant: PillProps['variant'];
}

export const XPill: React.FC<Props> = ({ variant }) => {
    return (
        <Pill variant={variant} className="py-[3px] rounded-circle px-[9px]">
            <X />
        </Pill>
    );
};
