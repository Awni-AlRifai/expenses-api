import { signupUser } from "@/services/Athentication";
import generateError from "@/utils/generateError";
import { useState } from "react";
import { signupFields } from "../constants/formFields";
import ErrorMessage from "./ErrorMessage";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signupUser(signupState);
    if (data?.errors) {
      generateError(data, setError);
      return;
    }
    setError(null);

    if(!data?.cookie) {
      setError("500 Error in server");
      return;
    }
    
    // should be refactored to https cookies
    localStorage.setItem('cookie',data.cookie);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
        <ErrorMessage message={error} />
      </div>
    </form>
  );
}
