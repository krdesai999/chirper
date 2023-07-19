import InputText from "../utils/inputText";

export default function LoginForm() {
    return (
      <div className="Login">
        <InputText
          label="User name"
          regex={/^[a-zA-Z\s]+$/}
          placeholder="Enter user name"
          required = {true}
        />
        <InputText
          label="Password"
          regex={/^[\w@_-\s]+$/}
          placeholder="Enter Password"
          password = {true}
          required = {true}
        />
      </div>
    );
}