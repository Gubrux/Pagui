import React, { useState, useEffect, useContext } from "react";
import { EventContext } from "../../context/EventContext";
import HTTPClient from "../../Utils/HTTPClient";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./EventIdTable.module.css";

function EventTable() {
    const { id } = useParams();
    const { events, setEvents } = useContext(EventContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const eventTitle = state.eventTitle;
    const userName = localStorage.getItem("userName");
    const [payments, setPayments] = useState([]);
    const [totalAmountPaid, setTotalAmountPaid] = useState({});

    const getPayments = () => {
        let client = new HTTPClient();
        client.getPaymentsByEvent(id).then((response) => {
            setPayments(response.data.payments);
            calculateTotalAmountPaid(response.data.payments);
        });
    };

    useEffect(() => {
        getPayments();
    }, []);

    const calculateTotalAmountPaid = (payments) => {
        const amounts = {};
        payments.forEach((payment) => {
            if (amounts[payment.userName]) {
                amounts[payment.userName] += payment.cost;
            } else {
                amounts[payment.userName] = payment.cost;
            }
        });
        setTotalAmountPaid(amounts);
    };

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
                                <td>{payment.userName}</td>
                                <td>{totalAmountPaid[payment.userName]}</td>
                                <td>
                                    {payment.comment}
                                    {payment.userName === userName && (
                                        <button
                                            onClick={() => {
                                                handleDeletePayment(
                                                    payment._id
                                                );
                                            }}
                                        >
                                            delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => {
                        handleDelete(id);
                    }}
                >
                    Delete Event
                </button>
            </div>
        </>
    );
}

export default EventTable;
