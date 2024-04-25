import React, { useState, useEffect, useContext } from "react";
import { EventContext } from "../../context/EventContext";
import HTTPClient from "../../Utils/HTTPClient";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./EventIdTable.module.css";
import { usePayments } from "../../hooks/usePayments";
import { formateador } from "../../Utils/formatter";

function EventTable() {
    const { id } = useParams();
    const { events, setEvents } = useContext(EventContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const eventTitle = state.eventTitle;
    const userName = localStorage.getItem("userName");
    const { payments, loading } = usePayments(id);
    console.log(payments);
    const handleDelete = (eventId) => {
        let client = new HTTPClient();
        client.deleteEvent(eventId).then(() => {
            console.log("Event deleted");
            setEvents(events.filter((event) => event._id !== eventId));
            navigate("/events");
        });
    };

    const handleDeletePayment = (paymentId) => {
        let client = new HTTPClient();
        client.deletePayment(id, paymentId).then(() => {
            console.log("Payment deleted");
            getPayments();
        });
    };

    return (
        <>
            <div className={styles.eventViewContainer}>
                <h1>Event: {eventTitle}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Payer</th>
                            <th>Total amount paid</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.payer}</td>
                                <td>{formateador(payment.paymentAmount)}</td>
                                <td>{payment.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className={styles.deleteButton}
                    onClick={() => {
                        handleDelete(id);
                    }}
                >
                    Delete Event
                </button>
                <button
                    className={styles.goBackButton}
                    onClick={() => {
                        navigate("/events");
                    }}
                >
                    Go back
                </button>
            </div>
        </>
    );
}

export default EventTable;
