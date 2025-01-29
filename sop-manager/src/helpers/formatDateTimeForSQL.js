export default function formatDateTimeForSQL(dateTime) {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 10);
}

