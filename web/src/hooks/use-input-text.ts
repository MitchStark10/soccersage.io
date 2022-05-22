import { ChangeEvent, useCallback, useState } from 'react';

// TODO: Complete this hook
export const useInputText = (
    startingValue: string
): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(startingValue);

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        []
    );

    return [value, onInputChange];
};
