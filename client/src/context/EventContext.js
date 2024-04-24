import React, { createContext, useState, useEffect } from "react";
import HTTPClient from "../Utils/HTTPClient";

const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getEvents = async () => {
            try {
                let client = new HTTPClient();
                const eventsResponse = await client.getAllEvents();
                setEvents(eventsResponse.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, []);
    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };
