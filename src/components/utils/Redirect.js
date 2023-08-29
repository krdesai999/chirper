import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth";

export default function Redirect() {
    const auth = useAuth();
    if (auth.user){
        console.log("Login first!");
        return <Navigate to="/auth/login" />
    }
    else {
        console.log("Welcome to chirper!");
        return <Navigate to="/blogs" />
    }
};
