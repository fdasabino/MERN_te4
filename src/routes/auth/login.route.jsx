import styled from "styled-components";
import LoginForm from "../../components/login.form.component";
import { useTheme } from "../../hooks/use.theme";

const StyledContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.bg};
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Login = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <StyledContainer bg={theme.background}>
      <button
        style={{ backgroundColor: theme.accent, color: theme.text }}
        onClick={toggleTheme}>
        Change Theme
      </button>
      <LoginForm />
    </StyledContainer>
  );
};

export default Login;
