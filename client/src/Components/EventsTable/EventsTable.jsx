import HTTPClient from "../../Utils/HTTPClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EventsTable.module.css";
function EventsTable() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const getEvents = async () => {
        try {
            let client = new HTTPClient();
            const eventsResponse = await client.getAllEvents();
            setEvents(eventsResponse.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleEventPayment = (
        eventId,
        eventTitle,
        payment,
        userName,
        cost
    ) => {
        navigate(`/events/${eventId}`, {
            state: {
                eventTitle: eventTitle,
                payment: payment,
                userName: userName,
                cost: cost,
            },
        });
        console.log(eventId, eventTitle, payment, userName, cost);
    };
    const handleMakePayment = (eventId, eventTitle, eventCost, payment) => {
        navigate(`/events/${eventId}/payment`, {
            state: {
                eventTitle: eventTitle,
                cost: eventCost,
                payment: payment,
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
                                                event.payment,
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
