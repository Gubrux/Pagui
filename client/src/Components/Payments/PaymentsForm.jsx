import HTTPClient from "../../Utils/HTTPClient";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./PaymentsForm.module.css";
function PaymentForm() {
    const { id } = useParams();
    const { state } = useLocation();
    console.log(state);
    const { cost } = useParams();
    console.log(cost);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const eventCost = state.cost;
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
        const parsedPaymentAmount = parseFloat(paymentAmount); // Convertir a número
        const remainingCost = eventCost - parsedPaymentAmount;
        // Crear un nuevo pago con el monto ingresado
        client
            .createPayment(id, {
                userName: userName,
                eventId: id,
                cost: parsedPaymentAmount, // Utilizar el valor convertido
                payment: comment,
            })
            .then(() => {
                // Redirigir de vuelta al evento después de realizar el pago
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
                    <label htmlFor="payment">
                        Commentary:
                        <textarea
                            name="payment"
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
