import React, {useState} from "react";

function toDoubleDigits(number: number): string {
    if (number >= 10) return number.toString();
    else return "0" + number;
}

function LiveTime() {
    const [hour, setHour] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const [started, setStart] = useState(false);

    function changeTime() {
        //console.log("Tock")
        let date = new Date();
        setHour(toDoubleDigits(date.getHours()));
        setMinutes(toDoubleDigits(date.getMinutes()));
        setSeconds(toDoubleDigits(date.getSeconds()));
    }

    if (!started) {
        setStart(true);
        //console.log("Tick");
        setInterval(changeTime, 1000)
    }

    return(
        <>
            {hour}:{minutes}:{seconds}
        </>
    )

}

export default LiveTime;