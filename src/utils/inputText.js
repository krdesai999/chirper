import { useState } from "react";

export default function InputText({
  label,
  regex,
  placeholder,
  password = false,
  required = false,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [emp, setEmpty] = useState(true);

  function onValueChange(e) {
    if (e.target.value === "") {
      setValue("");
      setEmpty(true);
      required ? setError("Value Required") : setError("");
    } else if (regex.test(e.target.value)) {
      setValue(e.target.value);
      setError("");
      setEmpty(false);
    } else {
      setError("Incorrect value");
    }
  }

  return (
    <>
      <label htmlFor="textValue" className="text label">
        {" "}
        {label}{" "}
      </label>
      <input
        type={password ? "password" : "text"}
        className="textValue"
        value={value}
        placeholder={placeholder}
        onChange={onValueChange}
      />
      {error !== "" ? (
        <label htmlFor="textValue" className="error">
          {error}
        </label>
      ) : (
        ""
      )}
    </>
  );
}

InputText.defaultProps = {
  label: "text",
  regex: /^[a-zA-Z\s]+$/,
  placeholder: "Enter text here",
};
