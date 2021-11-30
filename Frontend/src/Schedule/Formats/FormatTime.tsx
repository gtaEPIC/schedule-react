function toDoubleDigits(num: number) {
    return ('0' + num).slice(-2);
}

export default function FormatTime({date}: { date: Date }) {
    const hours = toDoubleDigits(date.getHours());
    const minutes = toDoubleDigits(date.getMinutes());
    const seconds = toDoubleDigits(date.getSeconds());
    return (
        <>
            {hours}:{minutes}:{seconds}
        </>
    );
}