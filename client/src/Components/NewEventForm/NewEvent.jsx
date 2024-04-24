import React, { useState, useContext } from "react";
import { EventContext } from "../../context/EventContext";
import HTTPClient from "../../Utils/HTTPClient";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

import styles from "./NewEvent.module.css";

function NewEvent() {
    const { setEvents } = useContext(EventContext);
    const { users, loading } = useUsers();
    const [data, setData] = useState({
        title: "",
        userName: localStorage.getItem("userName"),
        eventCost: 0,
        comment: "",
        selectedUsers: [],
    });
    const [errors, setErrors] = useState({}); // Inicializar errores como un objeto vacío
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value =
            event.target.name === "eventCost"
                ? parseFloat(event.target.value)
                : event.target.value;

        if (event.target.type === "checkbox") {
            const userId = event.target.value;
            const isChecked = event.target.checked;
            setData((prevData) => ({
                ...prevData,
                selectedUsers: isChecked
                    ? [...prevData.selectedUsers, userId]
                    : prevData.selectedUsers.filter((id) => id !== userId),
            }));
        } else {
            setData({
                ...data,
                [event.target.name]: value,
            });
        }
    };

    const validate = () => {
        let flag = true;
        const newErrors = {};

        if (!data.title) {
            newErrors.title = "El título es obligatorio";
            flag = false;
        }

        if (data.title && data.title.length < 10) {
            newErrors.title = "The title must be at least 10 characters long";
            flag = false;
        }

        if (!data.userName) {
            newErrors.userName = "The name is required";
            flag = false;
        }

        if (!data.eventCost) {
            newErrors.eventCost = "The eventCost is required";
            flag = false;
        }

        setErrors(newErrors); // Actualizar el estado de los errores
        return flag;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const client = new HTTPClient();
        const eventData = {
            ...data,
            createdBy: data.userName,
            participants: data.selectedUsers,
        };

        client
            .createEvent(eventData)
            .then((response) => {
                client.getAllEvents().then((eventsResponse) => {
                    setEvents(eventsResponse.data.events);
                    navigate("/events");
                });
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
        <div className={styles.newEventFormContainer}>
            <h1>Submit a new event and the total eventCost</h1>
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
                {errors.eventCost && <small>{errors.eventCost}</small>}
                <label htmlFor="eventCost">Total eventCost:</label>
                <input name="eventCost" type="number" onChange={handleChange} />
                <label htmlFor="users">Select the users:</label>
                {users.map((user) => (
                    <div className={styles.checkboxContainer} key={user._id}>
                        <input
                            type="checkbox"
                            id={user._id}
                            name="selectedUsers"
                            value={user._id}
                            onChange={handleChange}
                        />
                        <label htmlFor={user._id}>{user.name}</label>
                    </div>
                ))}
                <label htmlFor="comment">Your Comment:</label>
                <textarea name="comment" onChange={handleChange}></textarea>
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default NewEvent;
