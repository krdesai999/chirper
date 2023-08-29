import { useNavigate, useRouteError } from "react-router-dom";

export default function AuthError() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="auth-error" >
            <h2>Error!</h2>
            <p>{error.message}</p>
            <button onClick={() => navigate(-1)} > Go back! </button>
        </div>
    );
};
