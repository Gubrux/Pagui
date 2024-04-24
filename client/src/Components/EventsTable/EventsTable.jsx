import React, { useContext } from "react";
import { EventContext } from "../../context/EventContext";
import { useNavigate } from "react-router-dom";
import styles from "./EventsTable.module.css";

function EventsTable() {
    const { events } = useContext(EventContext);
    const navigate = useNavigate();

    const handleEventPayment = (
        eventId,
        eventTitle,
        comment,
        userName,
        cost
    ) => {
        navigate(`/events/${eventId}`, {
            state: {
                eventTitle: eventTitle,
                comment: comment,
                userName: userName,
                cost: cost,
            },
        });
        console.log(eventId, eventTitle, comment, userName, cost);
    };

    const handleMakePayment = (eventId, eventTitle, eventCost, comment) => {
        navigate(`/events/${eventId}/payment`, {
            state: {
                eventTitle: eventTitle,
                cost: eventCost,
                comment: comment,
            },
        });
    };

    const handleAddEvent = () => {
        navigate("/events/new");
    };

    return (
        <div className={styles.tableContainer}>
            <div>
                <h1>Events List</h1>
                <button onClick={handleAddEvent}>Add a New Event</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Total event cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length === 0 ? (
                        <tr>
                            <td colSpan="3">There are no events yet</td>
                        </tr>
                    ) : (
                        events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{event.cost}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleEventPayment(
                                                event._id,
                                                event.title,
                                                event.comment,
                                                event.userName,
                                                event.cost
                                            );
                                        }}
                                    >
                                        See Payments
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleMakePayment(
                                                event._id,
                                                event.title,
                                                event.cost
                                            );
                                        }}
                                    >
                                        Make a payment
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EventsTable;
