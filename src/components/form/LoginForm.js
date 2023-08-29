import InputText from "../utils/inputText";
import { FormProvider, useForm } from "react-hook-form";
import * as formConfig from "./formConfig";
import { useContext } from "react";
import { ContentUpdateContext } from "../../pages/Home";
import { content, contentActions } from "../utils/PageManager";

export default function LoginForm() {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      userName: "",
      password: "",
    },
  });


  const onSubmit = methods.handleSubmit((data) => {

  });

  return (
    <div className="Login">
      <h1>Login</h1>
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
