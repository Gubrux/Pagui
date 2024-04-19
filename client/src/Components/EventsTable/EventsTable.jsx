import HTTPClient from "../../Utils/HTTPClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EventsTable() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const getEvents = async () => {
        let client = new HTTPClient();
        const eventsResponse = await client.getAllEvents();
        const eventsWithAvgRating = await Promise.all(
            eventsResponse.data.events.map(async (event) => {
                const paymentsResponse = await client.getPaymentsByEvent(
                    event._id
                );
                const totalRating = paymentsResponse.data.payments.reduce(
                    (acc, payment) => acc + payment.rating,
                    0
                );
                const avgRating =
                    paymentsResponse.data.payments.length > 0
                        ? totalRating / paymentsResponse.data.payments.length
                        : 0;
                return { ...event, avgRating };
            })
        );
        setEvents(eventsWithAvgRating);
    };
    useEffect(() => {
        getEvents();
    }, []);

    const handleEventPayment = (eventId, eventTitle, payment, userName) => {
        navigate(`/events/${eventId}`, {
            state: {
                eventTitle: eventTitle,
                payment: payment,
                userName: userName,
            },
        });
    };
    const handleMakePayment = (eventId, eventTitle) => {
        navigate(`/events/${eventId}/payment`, {
            state: { eventTitle: eventTitle },
        });
    };
    const handleAddEvent = () => {
        navigate("/events/new");
    };

    return (
        <div>
            <div>
                <h1>Events List</h1>
                <button onClick={handleAddEvent}>Add a New Event</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Avg. Rating</th>
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
                                <td>{event.avgRating}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleEventPayment(
                                                event._id,
                                                event.title,
                                                event.payment,
                                                event.userName
                                            );
                                        }}
                                    >
                                        See Payments
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleMakePayment(
                                                event._id,
                                                event.title
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
