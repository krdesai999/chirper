import LoginForm from "../form/LoginForm.js";
import SignUp from "../form/Signup.js";

export default function LoginSignup(login = true) {
  return (<>{login ? <LoginForm /> : <SignUp />}</>);
}
