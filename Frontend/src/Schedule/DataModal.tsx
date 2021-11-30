import React, {useState} from "react";

import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import Event from "./Event";

export interface Callback {
    (event: Event): void
}

export interface CringeBack {
    (show: boolean, setShow: any): void
}

function DataModal(event: Event, submitChange: Callback, showStuff: CringeBack) {
    const [show, setShow] = useState(false);
    const [changing, setChanging] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        date: ""
    })

    showStuff(show, setShow);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const getDateFromEpoch = (epoch: number): string => {
        let date = new Date(epoch);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    return(
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{() => {
                        if (changing) return(<input type="text" placeholder="Title" value={event.title} onChange={handleChange} name="title"/>);
                        else return(<>{event.title}</>);
                    }}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {() => {
                        if (changing) return(
                            <div>

                            </div>
                        );
                        else return (
                            <div>
                                <span>{event.description}</span>
                                <span>Date: {() => getDateFromEpoch(event.start_time)}</span>
                            </div>
                        )
                    }}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setChanging(true)}>
                        Change
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DataModal;