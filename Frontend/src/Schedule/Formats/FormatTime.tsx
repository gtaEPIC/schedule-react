function toDoubleDigits(num: number) {
    return ('0' + num).slice(-2);
}

export default function FormatTime({date, hideSeconds = false}: { date: Date, hideSeconds?: boolean }) {
    const hours = toDoubleDigits(date.getHours());
    const minutes = toDoubleDigits(date.getMinutes());
    const seconds = toDoubleDigits(date.getSeconds());
    return (
        <>
            {hours}:{minutes}{!hideSeconds && `:${seconds}`}
        </>
    );
}