import { useNavigate } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };
    return (
        <>
            <div >
                <a href="/events" >
                    Pagui
                </a>
                <button  onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    );
}

export default Navigation;
