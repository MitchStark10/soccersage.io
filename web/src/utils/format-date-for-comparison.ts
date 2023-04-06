import formatInTimeZone from 'date-fns-tz/formatInTimeZone';

export const formatDateForComparison = (value?: string | null) => {
    if (value) {
        return formatInTimeZone(
            new Date(value),
            'America/Chicago',
            'MM/dd/yyyy'
        );
    }
};
