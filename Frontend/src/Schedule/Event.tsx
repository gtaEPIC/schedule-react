import FormatTime from "./Formats/FormatTime";
import React, {useState} from "react";
import "./CSS/Cards.css";
import {Socket} from "socket.io-client";
import {Sounds} from "./schedule";

class Event {
    title: string;
    description: string;
    start_time: number;
    end_time: number;
    where: string;
    how: string;
    old: string;

    constructor(title: string, description: string, start_time: number, end_time: number, where: string, how: string, old: string) {
        this.title = title;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time
        this.where = where;
        this.how = how;
        this.old = old;
    }
}



export function TableEvent({event}: {event: Event}) {
    let date: Date = new Date(event.start_time * 1000);
    let end_date: Date = new Date(event.end_time * 1000);
    return (
        <tr>
            <td>{date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}</td>
            <td><FormatTime date={date}/></td>
            <td><FormatTime date={end_date}/></td>
            <td>{event.title}</td>
        </tr>
    )
}

export interface EditEventData {
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    where: string;
    how: string;
    old: string;
}

function contentCheck(content1: EditEventData, content2: EditEventData): boolean {
    return content1.title === content2.title &&
        content1.description === content2.description &&
        content1.start_time.getTime() === content2.start_time.getTime() &&
        content1.end_time.getTime() === content2.end_time.getTime() &&
        content1.where === content2.where &&
        content1.how === content2.how
}

export function NewEventCard({setAdding, socket, sounds}: {setAdding: React.Dispatch<React.SetStateAction<boolean>>, socket: Socket, sounds: Sounds}) {
    const [lastData, setLastData] = useState({title: "", description: "", start_time: new Date(), end_time: new Date(), where: "", how: "", old: ""});
    let htmlTitle: HTMLInputElement = document.getElementById("title") as HTMLInputElement;
    let htmlDescription: HTMLTextAreaElement = document.getElementById("description") as HTMLTextAreaElement;
    let htmlStart: HTMLInputElement = document.getElementById("start") as HTMLInputElement;
    let htmlEnd: HTMLInputElement = document.getElementById("end") as HTMLInputElement;
    let htmlWhere: HTMLInputElement = document.getElementById("where") as HTMLInputElement;
    let htmlHow: HTMLInputElement = document.getElementById("how") as HTMLInputElement;

    return (
        <div className="Card-Full">
            <div className="Card-content">
                <h5 className="Card-title">New Event</h5>
                <table>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td><input type="text" id="title"/></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea id="description"/></td>
                        </tr>
                        <tr>
                            <td>Start Time</td>
                            <td>
                                <input type="datetime-local" id="start"/>
                            </td>
                        </tr>
                        <tr>
                            <td>End Time</td>
                            <td>
                                <input type="datetime-local" id="end"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Where</td>
                            <td><input type="text" id="where"/></td>
                        </tr>
                        <tr>
                            <td>How</td>
                            <td><input type="text" id="how"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Card-footer">
                <button className="Cancel" onClick={() => {
                    setAdding(false);
                    sounds.pBack(true);
                }}>Cancel
                </button>
                <button className="Save" onClick={() => {

                    let title: string = htmlTitle.value;
                    let description: string = htmlDescription.value;
                    let start_time: number = new Date(htmlStart.value).getTime() / 1000;
                    let end_time: number = new Date(htmlEnd.value).getTime() / 1000;
                    let where: string = htmlWhere.value;
                    let how: string = htmlHow.value;
                    let old: string = "";
                    let event: Event = new Event(title, description, start_time, end_time, where, how, old);
                    sounds.pEnter(true);
                    socket.emit("update", event, () => sounds.pSuccess(true));
                    setAdding(false);
                }}>Save
                </button>
            </div>
        </div>
    )
}

export function CardEvent({event, socket, sounds}: {event: Event, socket: Socket, sounds: Sounds}) {
    const domain = window.location.hostname;
    let startTime: Date = new Date(event.start_time * 1000);
    let endTime: Date = new Date(event.end_time * 1000);
    let timeNow: number = Math.floor(new Date().getTime() / 1000);
    let [time, setTime] = useState(timeNow);
    let [counting, setCounting] = useState(false);
    if (!counting) {
        setInterval(() => {
            setTime(Math.floor(new Date().getTime() / 1000));
        }, 1000);
        setCounting(true);
    }

    return (
        <>
            <div className={(event.start_time <= time && event.end_time > time) ? "Card-NOW" : "Card"}>
                <div className="Card-content">
                    <div className="Card-times">
                        <FormatTime date={startTime}/> - <FormatTime date={endTime}/>
                    </div>
                    <div className="Card-title">
                        {event.title}
                    </div>
                    {event.description}
                </div>
                <div className="Card-footer">
                    <div className="Buttons">
                        <img src={"http://" + domain + ":8080/icons/edit.png"} alt={"Edit"} className="Icon" onClick={() => {
                            //setEditing(event);
                        }} hidden={true}/>
                        <img src={"http://" + domain + ":8080/icons/delete.png"} alt={"Delete"} className="Icon" onClick={() => {
                            sounds.pEnter(true);
                            socket.emit("delete", event, () => sounds.pSuccess(true));
                        }}/>
                    </div>
                    <div className="Card-where">
                        Where: {event.where}
                    </div>
                    <div className="Card-how">
                        How: {event.how}
                    </div></div>
            </div>
        </>
    );
}

export default Event;