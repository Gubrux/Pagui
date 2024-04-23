import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTPClient from "../../Utils/HTTPClient";

import styles from "./NewEvent.module.css";

function NewEvent() {
    const [data, setData] = useState({
        title: "",
        userName: localStorage.getItem("userName"),
        cost: 0,
        payment: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        let value =
            event.target.name === "cost"
                ? parseFloat(event.target.value)
                : event.target.value;

        setData({
            ...data,
            [event.target.name]: value,
        });
    };

    const validate = () => {
        let flag = true;
        let errors = {};

        if (!data.title) {
            errors.title = "El título es obligatorio";
            flag = false;
        }

        if (data.title && data.title.length < 10) {
            errors.title = "The title must be at least 10 characters long";
            flag = false;
        }

        if (!data.userName) {
            errors.userName = "The name is required";
            flag = false;
        }

        if (!data.cost) {
            errors.cost = "The cost is required";
            flag = false;
        }

        setErrors(errors);
        return flag;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        let client = new HTTPClient();

        client
            .createEvent(data)
            .then((response) => {
                navigate("/events");
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response.data.errors);
                }
                console.log(error);
            });
        console.log(data);
    };

    const handleCancel = () => {
        navigate("/events");
    };

    return (
        <>
            <div className={styles.newEventFormContainer}>
                <h1>Submit a new event and the total cost</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Event title:</label>
                    {errors.title && <small>{errors.title}</small>}
                    <input name="title" type="text" onChange={handleChange} />
                    <label htmlFor="userName">Your Name:</label>
                    {errors.name && <small>{errors.name}</small>}
                    <input
                        value={data.userName || ""}
                        name="userName"
                        type="text"
                        disabled
                    />
                    {errors.cost && <small>{errors.cost}</small>}
                    <label htmlFor="cost">Total cost:</label>
                    <input name="cost" type="number" onChange={handleChange} />
                    <label htmlFor="payment">Your Payment:</label>
                    <textarea name="payment" onChange={handleChange}></textarea>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default NewEvent;
