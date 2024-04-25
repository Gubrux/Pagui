import { useState, useEffect } from "react";
import HTTPClient from "../Utils/HTTPClient";

export const usePayments = (id) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const httpClient = new HTTPClient();
                const response = await httpClient.getPaymentsByEvent(id);
                setPayments(response.data.payments);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPayments();
    }, []);

    return { payments, loading };
};
