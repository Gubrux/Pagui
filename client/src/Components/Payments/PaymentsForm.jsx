import React, { useState, useContext } from "react";
import { EventContext } from "../../context/EventContext";
import HTTPClient from "../../Utils/HTTPClient";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentsForm.module.css";

function PaymentForm() {
    const { id } = useParams();
    const { events, setEvents } = useContext(EventContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const eventCost = state.cost;
    const [paymentAmount, setPaymentAmount] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});

    console.log(eventCost);
    const handlePaymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const validate = () => {
        let flag = true;
        let errors = {};

        if (!paymentAmount) {
            errors.pay = "The payment amount is required";
            flag = false;
        }

        setErrors(errors);
        return flag;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return false;
        }

        let client = new HTTPClient();
        const parsedPaymentAmount = parseFloat(paymentAmount);
        const remainingCost = eventCost - parsedPaymentAmount;
        client
            .createPayment(id, {
                userName: userName,
                eventId: id,
                cost: parsedPaymentAmount,
                comment: comment,
            })
            .then(() => {
                navigate(`/events/${id}`, {
                    state: { eventTitle: state.eventTitle },
                });
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({});
                }
                console.log(error);
            });
    };

    const handleCancel = () => {
        navigate(`/events/${id}`, {
            state: { eventTitle: state.eventTitle },
        });
    };

    return (
        <>
            <div className={styles.PaymentFormContainer}>
                <form onSubmit={handleSubmit}>
                    <h1>Make a payment for the event: {state.eventTitle}</h1>
                    <label htmlFor="userName">
                        Debtor:
                        <input
                            value={userName || ""}
                            type="text"
                            name="userName"
                            disabled
                        />
                    </label>
                    <label htmlFor="pay">Payment amount:</label>
                    <input
                        type="number"
                        name="pay"
                        value={paymentAmount}
                        onChange={handlePaymentAmountChange}
                    />
                    {errors.pay && <small>{errors.pay}</small>}
                    <label htmlFor="comment">
                        Commentary:
                        <textarea
                            name="comment"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default PaymentForm;
