import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth";

export default function Blogs() {
    const auth = useAuth();
    if (!auth.user) {
      console.log("Login first!");
      return <Navigate to="/auth/login" />;
    }
    return <div className="blogs">Blogs</div>;
};
