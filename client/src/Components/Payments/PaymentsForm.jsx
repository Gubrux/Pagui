import HTTPClient from "../../Utils/HTTPClient";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function PaymentForm() {
    const { id } = useParams();
    const { state } = useLocation();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    const handleChange = (event) => {
        setData({
            eventId: id,
            userName: userName,
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const validate = () => {
        let flag = true;
        let errors = {};

        if (!data.userName) {
            errors.userName = "The user name is required";
            flag = false;
        }

        if (!data.rating) {
            errors.rating = "The rating is required";
            flag = false;
        }

        if (!data.payment) {
            errors.payment = "The comment is required";
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
        client
            .createPayment(id, data)
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
        console.log("Cancel");
        navigate(`/events/${id}`);
    };
    return (
        <>
            <div>
                <h1>Make a payment for the event: {state.eventTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userName">
                        Debtor:
                        <input
                            value={userName || ""}
                            type="text"
                            name="userName"
                            disabled
                        />
                    </label>
                    {errors.userName && <small>{errors.userName}</small>}
                    <label htmlFor="rating">
                        Rating:
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            onChange={handleChange}
                        />
                    </label>
                    {errors.rating && <small>{errors.rating}</small>}
                    <label htmlFor="payment">
                        Commentary:
                        <textarea name="payment" onChange={handleChange} />
                    </label>
                    {errors.payment && <small>{errors.payment}</small>}
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default PaymentForm;
