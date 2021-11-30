import React, {useState} from "react";

function toDoubleDigits(number: number): string {
    return ("0" + number).slice(-2);
}

function LiveTime() {
    const [year, setYear] = useState("YYYY");
    const [month, setMonth] = useState("MM");
    const [day, setDay] = useState("DD");

    const [started, setStart] = useState(false);

    function changeTime() {
        //console.log("Tock")
        let date = new Date();
        setYear(date.getFullYear().toString());
        setMonth(toDoubleDigits(date.getMonth() + 1));
        setDay(toDoubleDigits(date.getDate()));
    }

    if (!started) {
        setStart(true);
        //console.log("Tick");
        setInterval(changeTime, 1000)
    }

    return(
        <>
            {year}/{month}/{day}
        </>
    )

}

export default LiveTime;