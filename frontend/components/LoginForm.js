import { useState } from "react";
import { useRouter } from "next/router";
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import { loginUser } from "@/services/Athentication";
import ErrorMessage from "./ErrorMessage";
import generateError from "@/utils/generateError";
import storeToken from "@/utils/storeToken";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function LoginForm() {
  const router = useRouter();
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(loginState);
    const data = await loginUser(loginState);
    if (data?.errors || data?.message) {
      generateError(data, setError);
      return;
    }
    setError(null);
    console.log(data);
    // if there is no cookie the user is not signed in
    if (!data?.token) {
      setError("500 Error in server");
      return;
    }

    storeToken(data.token);

    // Redirect to the dashboard
    router.push("/");
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormAction handleSubmit={handleSubmit} text="login" />
      <ErrorMessage message={error} />
    </form>
  );
}
