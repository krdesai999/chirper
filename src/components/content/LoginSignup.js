import { useContext } from "react";
import { ContentContext } from "../../pages/Home.js";
import LoginForm from "../form/LoginForm.js";
import SignUp from "../form/Signup.js";
import { content } from "../utils/PageManager.js";

export default function LoginSignup() {
  const page = useContext(ContentContext);
  console.log(3);
  return (
    <>{page.currentContent === content.login ? <LoginForm /> : <SignUp />}</>
  );
}
