import formatInTimeZone from 'date-fns-tz/formatInTimeZone';

export const formatDatetime = (value?: string | null) => {
    if (value) {
        return formatInTimeZone(
            new Date(value),
            'America/Chicago',
            'yyyy-MM-dd HH:mm'
        );
    }
};
