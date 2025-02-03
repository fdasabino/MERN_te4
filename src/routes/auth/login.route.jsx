import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LoginForm from "../../components/login.form.compnent";

const Login = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div>
      <h3>Login</h3>
      <LoginForm />
    </div>
  );
};

export default Login;
