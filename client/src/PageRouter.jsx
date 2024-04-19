import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./Page/Register/RegisterPage";
import LoginPage from "./Page/Login/LoginPage";
import EventsView from "./Page/eEvents/EventsView";
import EventView from "./Page/eEvents/id/EventView";
import NewEventView from "./Page/eEvents/new/NewEventView";
import PaymentView from "./Page/eEvents/id/payment/PaymentView";
const PageRouter = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route index={true} path="/login" element={<LoginPage />} />
                <Route path="/events" element={<EventsView />} />
                <Route path="/events/:id" element={<EventView />} />
                <Route path="/events/new" element={<NewEventView />} />
                <Route path="/events/:id/payment" element={<PaymentView />} />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRouter;
