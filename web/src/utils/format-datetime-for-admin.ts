import formatInTimeZone from 'date-fns-tz/formatInTimeZone';

export const formatDatetimeForAdmin = (value?: string | null) => {
    if (value) {
        return formatInTimeZone(
            new Date(value),
            'America/Chicago',
            'yyyy-MM-dd HH:mm'
        );
    }
};
