import Event, {TableEvent} from "./Event";
import React from "react";
import "./CSS/EventRows.css";
import "../Roboto.css";

function EventRows({events}: {events: Event[] | undefined}) {
    if (!events || events.length === 0) return(
        <tr>
            <td colSpan={4} className="no-events">
                No events scheduled
            </td>
        </tr>
    );
    console.log(events)
    let rows: JSX.Element[] = [];
    for (let event of events) {
        rows.push(
            <>
                <TableEvent event={event} />
            </>
        );
    }
    return (
        <>
            {rows}
        </>
    );
}

export default EventRows;