import { useState } from "react";
import HTTPClient from "../../Utils/HTTPClient";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
const LoginForm = (props) => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const validate = () => {
        let flag = true;
        let errors = {};

        if (data.password.lenght <= 5) {
            errors.password =
                "La password no puede tener menos de 5 caracteres";
            flag = false;
        }
        //...
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
            .login(data.email, data.password)
            .then((response) => {
                localStorage.setItem("userName", response.data.user.name);
                navigate("/events");
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response.data.errors);
                }
                console.log(error);
            });
    };

    return (
        <>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h1>Login</h1>
                    <div>
                        <label htmlFor="email">Email</label>
                        {errors.email && (
                            <small className={styles.loginFormError}>
                                {errors.email}
                            </small>
                        )}
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        {errors.password && (
                            <small className={styles.loginFormError}>
                                {errors.password}
                            </small>
                        )}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password || ""}
                            onChange={handleChange}
                            required={true}
                            minLength={5}
                        />
                    </div>
                    <div>
                        <button>Log In</button>
                        <div>
                            <p>
                                not registred? <br />
                                <a href="/">Register now</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
