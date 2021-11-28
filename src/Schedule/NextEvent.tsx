import Event, {CardEvent} from "./Event";
import React from "react";
import "./CSS/Cards.css";
import "../Roboto.css";
import {Socket} from "socket.io-client";
import {Sounds} from "./schedule";

function getNextEvent(events: Event[] | undefined): Event | undefined {
    console.log("getNextEvent", events);
    if (!events) {
        return undefined;
    }
    let nextEvent: Event | undefined = undefined;
    for (let i = 0; i < events.length; i++) {
        if (events[i].end_time > Math.floor(Date.now() / 1000)) {
            if (nextEvent === undefined || events[i].end_time < nextEvent.end_time) {
                nextEvent = events[i];
            }
        }
    }
    console.log(nextEvent);
    return nextEvent;
}

function NextEvent({events, socket, sounds}: {events: Event[] | undefined, socket: Socket, sounds: Sounds}) {
    let nextEvent: Event | undefined = getNextEvent(events);
    if (!nextEvent) return(
        <div className="Card-Full">
            <div className="Card-content">
                <div className="Card-no-events">
                    <h1>No events scheduled</h1>
                </div>
            </div>
        </div>
    );
    console.log(events)
    return (
        <>
            <CardEvent event={nextEvent} socket={socket} sounds={sounds}/>
        </>
    )
}

export default NextEvent;