import { ChangeEvent, useCallback, useState } from 'react';

export const useInputText = (
    startingValue: string
): [
    string,
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] => {
    const [value, setValue] = useState(startingValue);

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue(e.target.value),
        []
    );

    return [value, onInputChange];
};
