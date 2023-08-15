import InputText from "../utils/inputText";
import { FormProvider, useForm } from "react-hook-form";
import * as formConfig from "./formConfig";

export default function LoginForm() {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = methods.handleSubmit(data => {
    console.log(data);
  });

  return (
    <div className="Login">
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <InputText
            {...formConfig.userNameConfig}
          />
          <br />
          <InputText
            {...formConfig.passwordConfig}
          />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
        </form>
      </FormProvider>
    </div>
  );
}
