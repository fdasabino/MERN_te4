import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W]).{8,}$/;

const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, "Does your password meet the requirements?")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [error, setError] = useState(null);
  console.log("LoginForm", error);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  // handle login
  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setError("User not found");
        return;
      }

      if (error.response.status === 400) {
        setError("Invalid credentials");
        return;
      }
    }
  };

  return (
    <div>
      <h3>Login to continue</h3>
      {error && <div>{error}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={async (values) => {
          await handleLogin(values);
        }}>
        <Form>
          <div className="">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
            />
            <ErrorMessage
              name="email"
              component="div"
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
