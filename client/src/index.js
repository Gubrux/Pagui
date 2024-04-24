import React from "react";
import ReactDOM from "react-dom/client";
import PageRouter from "./PageRouter";

import { EventProvider } from "./context/EventContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <EventProvider>
            <PageRouter />
        </EventProvider>
    </React.StrictMode>
);
