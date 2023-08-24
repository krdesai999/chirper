import LoginForm from "../form/LoginForm.js";
import SignUp from "../form/Signup.js";
import { content } from "../utils/PageManager.js";

export default function LoginSignup({page = content.login}) {
  return <>{page === content.login ? <LoginForm /> : <SignUp />}</>;
}
