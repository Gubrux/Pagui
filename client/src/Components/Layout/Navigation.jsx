import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };
    return (
        <>
            <div className={styles.navigation}>
                <a href="/events"> <label>Pa</label>Gui</a>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default Navigation;
