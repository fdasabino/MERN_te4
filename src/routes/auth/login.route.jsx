import styled from "styled-components";
import LoginForm from "../../components/login.form.component";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Login = () => {
  return (
    <StyledContainer>
      <LoginForm />
    </StyledContainer>
  );
};

export default Login;
