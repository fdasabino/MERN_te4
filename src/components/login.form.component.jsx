import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { setUserToState } from "../store/user.slice";

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

// Styled components
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${(props) => props.background || "#BF4F74"};
  color: white;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
`;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
      setLoading(true);
      const response = await axios.post("https://server-setup-express.vercel.app/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      dispatch(setUserToState(response.data.user, response.data.token));
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setError(error.response.data.message);
        return;
      }

      if (error.response.status === 400) {
        setError(error.response.data.message);
        return;
      }
    } finally {
      setLoading(false);
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
        <StyledForm>
          <StyledWrapper>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            <StyledErrorMessage
              name="email"
              component="p"
            />
          </StyledWrapper>
          <StyledWrapper>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <StyledErrorMessage
              name="password"
              component="p"
            />
          </StyledWrapper>
          <StyledButton
            disabled={loading}
            type="submit">
            {loading ? "Working on it..." : "Login"}
          </StyledButton>
        </StyledForm>
      </Formik>
    </div>
  );
};

export default LoginForm;
