import axios from "axios";

class HTTPClient {
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true,
        });
    }

    login(email, password) {
        return this.instance.post("/login", {
            email,
            password,
        });
    }

    register(data) {
        return this.instance.post("/register", data);
    }

    createEvent(data) {
        return this.instance.post("/events/new", data);
    }
    getAllEvents() {
        return this.instance.get("/events");
    }
    createPayment(eventId, data) {
        return this.instance.post(`/events/${eventId}/payment`, data);
    }

    getPaymentsByEvent(eventId) {
        return this.instance.get(`/events/${eventId}/payments`);
    }

    deleteEvent(eventId) {
        return this.instance.delete(`/events/${eventId}`);
    }
    deletePayment(eventId, paymentId) {
        return this.instance.delete(`/events/${eventId}/payments/${paymentId}`);
    }
}

export default HTTPClient;
