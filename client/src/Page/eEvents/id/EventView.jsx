import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HTTPClient from "../../../Utils/HTTPClient";

import Layout from "../../../Components/Layout/Layout";
import styles from "./EventView.module.css";

function EventView() {
    const [payments, setPayments] = useState([]);
    const { id } = useParams();
    const { state } = useLocation();
    console.log(state);
    const navigate = useNavigate();
    const eventTitle = state.eventTitle;
    const userName = localStorage.getItem("userName");
    const cost = state.cost;
    // console.log(cost)

    const getPayments = () => {
        let client = new HTTPClient();
        client.getPaymentsByEvent(id).then((response) => {
            setPayments(response.data.payments);
        });
    };
    useEffect(() => {
        getPayments();
    }, []);

    const handleDelete = (eventId) => {
        let client = new HTTPClient();
        client.deleteEvent(eventId).then(() => {
            console.log("Event deleted");
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
            <Layout />
            <div className={styles.eventViewContainer}>
                <h1>Event: {eventTitle}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Created By</th>
                            <th>Total event cost</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.userName}</td>
                                <td>{cost}</td>
                                <td>{payment.payment}</td>
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
            <div className={styles.eventViewContainer}>
                <h2>Payments list:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Payer</th>
                            <th>Amount</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.userName}</td>
                                <td>{payment.cost}</td>
                                <td>{payment.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default EventView;
