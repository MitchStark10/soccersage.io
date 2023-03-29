import formatInTimeZone from 'date-fns-tz/formatInTimeZone';

interface Options {
    includeWeekday?: boolean;
}

export const formatDatetimeForUser = (
    value: string | null | undefined,
    options?: Options
) => {
    if (value) {
        const format = options?.includeWeekday
            ? 'iii, MMM d, h:mm a'
            : 'MMM d, h:mm a';
        return formatInTimeZone(
            new Date(value),
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            format
        );
    }
};
