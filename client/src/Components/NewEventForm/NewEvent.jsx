import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTPClient from "../../Utils/HTTPClient";

function NewEvent() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const handleChange = (event) => {
        setData({
            userName: userName,
            ...data,
            [event.target.name]: event.target.value,
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
    };
    const handleCancel = () => {
        navigate("/events");
    };

    return (
        <>
            <div>
                <h1>Submit an Event and your Payment</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Event title:</label>
                    {errors.title && <small>{errors.title}</small>}
                    <input name="title" type="text" onChange={handleChange} />
                    <label htmlFor="userName">Your Name:</label>
                    {errors.name && <small>{errors.name}</small>}
                    <input
                        value={userName || ""}
                        name="userName"
                        type="text"
                        disabled
                    />
                    <label htmlFor="rating">
                        Rating:
                        <input
                            type="number"
                            name="rating"
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="payment">Your payment:</label>
                    <textarea name="payment" onChange={handleChange}></textarea>
                    <button type="submit">Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default NewEvent;
