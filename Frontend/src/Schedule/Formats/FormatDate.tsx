function toDoubleDigits(num: number) {
    return ('0' + num).slice(-2);
}

export default function FormatDate({date}: { date: Date }) {
    const year = date.getFullYear();
    const month = toDoubleDigits(date.getMonth() + 1);
    const day = toDoubleDigits(date.getDate());
    return (
        <>
            {year}/{month}/{day}
        </>
    );
}