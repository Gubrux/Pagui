import { useState, useEffect } from "react";
import HTTPClient from "../Utils/HTTPClient";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const httpClient = new HTTPClient();
                const response = await httpClient.getAllUsers();
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading };
};
