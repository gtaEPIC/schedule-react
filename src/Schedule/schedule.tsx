import React, {useState, useEffect} from "react";

import Table from 'react-bootstrap/Table';

import "./schedule.css";
import Event from './Event'
import useAudio, {Props} from "./UseAudio";
import LiveTime from "./LiveTime";

function Schedule() {
    let [started, setStarted] = useState(false);
    const domain = window.location.hostname;
    const [isPlaying, setPlaying] = useAudio("http://" + domain + ":8080/sounds/Music.mp3", () => {
        setPlaying(true)
    });
    const [isPAlert, setPAlert] = useAudio("http://" + domain + ":8080/sounds/Alert.mp3", () => {});
    const [isPBack, setPBack] = useAudio("http://" + domain + ":8080/sounds/Back.mp3", () => {});
    const [isPDeselect, setPDeselect] = useAudio("http://" + domain + ":8080/sounds/Deselect.mp3", () => {});
    const [isPEnter, setPEnter] = useAudio("http://" + domain + ":8080/sounds/Enter.mp3", () => {});
    const [isPListing, setPListing] = useAudio("http://" + domain + ":8080/sounds/Listing.mp3", () => {});
    const [isPSelect, setPSelect] = useAudio("http://" + domain + ":8080/sounds/Select.mp3", () => {});
    const [isPSuccess, setPSuccess] = useAudio("http://" + domain + ":8080/sounds/Success.mp3", () => {});


    if (!started) {
        setStarted(true);
        const ws = new WebSocket("ws://" + domain + ":8080");

        document.addEventListener("click", () => {
            if (!isPlaying)
                setPlaying(true);
        });

        console.log("Hello!")

        let listOfEvents: Array<Event> = [];

        ws.addEventListener("close", () => {
            setPAlert(true);
            alert("Disconnected from server!")
        })

        ws.addEventListener("open", () => {
            setPSelect(true)
            console.log(isPSelect);
            ws.send(JSON.stringify({
                type: "list"
            }))
        })
        ws.addEventListener("message", data => {
            //console.log(JSON.parse(data.data))
            setPListing(true);
            listOfEvents = JSON.parse(data.data).events;
            console.log(listOfEvents);
        })

    }

    const show: boolean = false;
    const setShow: any = null;
    const getStuff = (aShow: boolean, aSetShow: any) => {
        show = aShow;


    }

    return(
        <div>
            <div className="title">Upcoming Events:</div>
            <Table>
                <thead>
                    <tr>
                        <th><LiveTime /></th>
                        <th>Event Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td className="occupied">Test1</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Schedule;