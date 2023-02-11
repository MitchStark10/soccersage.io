import { Check } from 'src/components/Icons/Check';

import { SelectProps } from '.';

export interface OptionData {
    value: string;
    label: string;
}

type Props = Pick<SelectProps, 'setValue'> &
    OptionData & {
        currentValue: string;
    };

export const Option: React.FC<Props> = ({
    label,
    value,
    currentValue,
    setValue,
}) => {
    return (
        <button
            className={
                'text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-slate-700 flex items-center gap-2'
            }
            onClick={() => setValue(value)}
        >
            {currentValue === value ? <Check /> : null}
            {label}
        </button>
    );
};
