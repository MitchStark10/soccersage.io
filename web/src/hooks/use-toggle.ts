import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean): [boolean, () => void] => {
    const [value, setValue] = useState(defaultValue);
    const toggleValue = useCallback(() => setValue(!value), [value]);
    return [value, toggleValue];
};
