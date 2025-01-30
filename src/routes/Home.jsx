import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../store/userSlice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
