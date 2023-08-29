import InputText from "../utils/inputText";
import { FormProvider, useForm } from "react-hook-form";
import * as formConfig from "./formConfig";
import { useAuth } from "../Auth";
import { Navigate, useNavigate } from "react-router-dom";
import { SignUp } from "../User/UserManagement";

export default function SignUpForm() {
  const auth = useAuth();
  const navi = useNavigate();

  // React hook default
  const methods = useForm({
    mode: "all",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  if (auth.user) {
    return <Navigate to="/blogs" />;
  }

  function handleAttributes(data) {
    var tempArray = [];
    for (const [key, value] of Object.entries(data)) {
      if (key !== "userName" && key !== "password") {
        tempArray.push({
          Name: key,
          Value: value,
        });
      }
    }
    return tempArray;
  }

  const onSubmit = methods.handleSubmit((data) => {
    data.attributes = handleAttributes(data);
    const redirectTo = SignUp(data.userName, data.password, data.attributes);
    if (redirectTo === "/blogs"){
      return navi(redirectTo);
    }
  });

  return (
    <div className="sign-up">
      <h1>Sign up</h1>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <InputText {...formConfig.userNameConfig} />
          <br />
          <InputText {...formConfig.passwordConfig} />
          <div>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
