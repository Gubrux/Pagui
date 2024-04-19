import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HTTPClient from "../../../Utils/HTTPClient";

import Layout from "../../../Components/Layout/Layout";

function EventView() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const eventTitle = state.eventTitle;
    const [payments, setPayments] = useState([]);
    const userName = localStorage.getItem("userName");

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
            <div>
                <h1>{eventTitle}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Payment made by:</th>
                            <th>Rating</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>
                                    {payment.userName}
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
                                <td>{payment.rating}</td>
                                <td>{payment.payment}</td>
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

export default EventView;
