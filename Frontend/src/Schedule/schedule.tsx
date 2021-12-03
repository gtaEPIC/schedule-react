import React, {useState, useEffect, SetStateAction, Dispatch} from "react";

import Table from 'react-bootstrap/Table';

import "./CSS/schedule.css";
import Event, {EditEventData, NewEventCard} from './Events/Event';
import useAudio from "./UseAudio";
import LiveTime from "./Live/LiveTime";
import EventRows from "./Events/EventRows";
import {io, Socket} from "socket.io-client";
import LiveDate from "./Live/LiveDate";
import NextEvent from "./Events/NextEvent";
import {log} from "util";
import * as Console from "console";

export interface Sounds {
    music1: React.Dispatch<React.SetStateAction<boolean>>,
    music2: React.Dispatch<React.SetStateAction<boolean>>,
    pAlert: React.Dispatch<React.SetStateAction<boolean>>,
    pBack: React.Dispatch<React.SetStateAction<boolean>>,
    pDeselect: React.Dispatch<React.SetStateAction<boolean>>,
    pEnter: React.Dispatch<React.SetStateAction<boolean>>,
    pListing: React.Dispatch<React.SetStateAction<boolean>>,
    pSelect: React.Dispatch<React.SetStateAction<boolean>>,
    pSuccess: React.Dispatch<React.SetStateAction<boolean>>,

}

export let ListOfSounds: Sounds;
const domain = window.location.hostname;
export let wsSocket: Socket = io("ws://" + domain + ":8080");


export let AddingEvent: boolean = false;
export let newData: EditEventData | undefined;
export function setAddingEvent(value: boolean, data?: EditEventData) {
    console.log("setAddingEvent");
    AddingEvent = value;
    newData = data;
}

function Schedule() {
    let [started, setStarted] = useState(false);
    const [music1, setMusic1] = useAudio("http://" + domain + ":8080/sounds/Music.mp3", () => {
        setMusic2(true);
    });
    const [music2, setMusic2] = useAudio("http://" + domain + ":8080/sounds/Music2.mp3", () => {
        setMusic1(true);
    });
    const [isPAlert, setPAlert] = useAudio("http://" + domain + ":8080/sounds/Alert.mp3", () => {});
    const [isPBack, setPBack] = useAudio("http://" + domain + ":8080/sounds/Back.mp3", () => {});
    const [isPDeselect, setPDeselect] = useAudio("http://" + domain + ":8080/sounds/Deselect.mp3", () => {});
    const [isPEnter, setPEnter] = useAudio("http://" + domain + ":8080/sounds/Enter.mp3", () => {});
    const [isPListing, setPListing] = useAudio("http://" + domain + ":8080/sounds/Listing.mp3", () => {});
    const [isPSelect, setPSelect] = useAudio("http://" + domain + ":8080/sounds/Select.mp3", () => {});
    const [isPSuccess, setPSuccess] = useAudio("http://" + domain + ":8080/sounds/Success.mp3", () => {});
    const [events, setEvents]: [Event[] | undefined, Dispatch<SetStateAction<Event[] | undefined>>] = useState();
    const [showingAlert, setShowingAlert] = useState(false);
    const [editData, setEditData] = useState<EditEventData | undefined>(undefined);

    ListOfSounds = {
        music1: setMusic1,
        music2: setMusic2,
        pAlert: setPAlert,
        pBack: setPBack,
        pDeselect: setPDeselect,
        pEnter: setPEnter,
        pListing: setPListing,
        pSelect: setPSelect,
        pSuccess: setPSuccess
    }

    const handleList = (data: Event[]) => {
        console.log(data);
        setEvents(data);
        setPListing(true);
    };


    if (!started) {
        setInterval(() => {
            if (newData !== editData) {
                setEditData(newData);
            }
        }, 100);
        setStarted(true);

        document.addEventListener("click", () => {
            if (!music1 && !music2)
                setMusic2(true);
        });

        console.log("Hello!")

        wsSocket.on("disconnect", () => {
            setPAlert(true);
            setShowingAlert(true);
            //alert("Disconnected from server!")
        });

        wsSocket.on("connect", () => {
            console.log("Connected to server!")
            setPSelect(true)
            setShowingAlert(false);
            wsSocket.emit("list", handleList);
        });

        wsSocket.on("list", handleList);

        wsSocket.on("close", (err: any) => {
            console.log(err);
            setPAlert(true);
            setShowingAlert(true);
        });

        wsSocket.on("connect_error", (err: any) => {
            console.log(err);
            setPAlert(true);
            setShowingAlert(true);
        });

    }


    /*
    const show: boolean = false;
    const setShow: any = null;
    const getStuff = (aShow: boolean, aSetShow: any) => {
        show = aShow;


    }

     */

    return(
        <div>
            <div className="Card-alert" hidden={!showingAlert}>
                <div className="Card-no-events">
                    <p>Disconnected from server!</p>
                </div>
            </div>
            <div className="top">
                <h1>Schedule</h1>
                <h2>Time now:</h2>
                <div className="liveTime">
                    <LiveDate/> | <LiveTime/>
                </div>
            </div>
            <div className="top">
                <h2>Next Event:</h2>
                <NextEvent events={events} />
            </div>
            <div className="top">
                <div className="AddEvent" hidden={AddingEvent}>
                    <button className="AddEvent" onClick={() => {
                        setPEnter(true);
                        setAddingEvent(true);
                    }}>Create New Event</button>
                </div>
                <div className="AddEvent" hidden={!AddingEvent}>
                    <NewEventCard data={editData} />
                </div>
                <div className="AddEvent">
                    <button className="AddEvent" onClick={() => {
                        setPEnter(true);
                        setAddingEvent(true, {
                            title: "Test",
                            description: "Something Sussy",
                            start_time: new Date(),
                            end_time: new Date(),
                            where: "",
                            how: "",
                            old: ""
                        });
                    }}>Demo</button>
                </div>
            </div>
            <div className="title">Upcoming Events:</div>
            <Table>
                <thead>
                    <tr>
                        <th><LiveDate /></th>
                        <th><LiveTime /></th>
                        <th>End Time</th>
                        <th>Event Name</th>
                    </tr>
                </thead>
                <tbody>
                    <EventRows events={events}/>
                </tbody>
            </Table>
        </div>
    )
}

export default Schedule;