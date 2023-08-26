import InputText from "../utils/inputText";
import { FormProvider, useForm } from "react-hook-form";
import * as formConfig from "./formConfig";
import { useContext } from "react";
import { ContentUpdateContext } from "../../pages/Home";
import { content, contentActions } from "../utils/PageManager";

export default function SignUp() {

    // React hook default
    const methods = useForm({
      mode: "all",
      defaultValues: {
        userName: "",
        password: "",
      },
    });

    // Content change reducer
    const contentUpdater = useContext(ContentUpdateContext);

    function handleAttributes(data) {
      var tempArray = [];
      for (const [key, value] of Object.entries(data)) {
        if(key!=="userName" || key!== "password")
        console.log(`${key}: ${value}`);
      tempArray.push(value);
      }
      return tempArray;
    }

    const onSubmit = methods.handleSubmit((data) => {
      data.attributes = handleAttributes(data);
      contentUpdater({
        type: contentActions.toBlogs,
        payload: { data: data, from: content.signUp },
      });
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