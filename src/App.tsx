import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoginPage, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const onSwitchLogin = () => {
    setIsLogin(!isLoginPage);
  };

  const onForgetPassword = () => {
    navigate("/reset-password-send-email");
  };

  return (
    <>
      <div className="grid grid-cols-2 font-bold ">
        {isLoginPage ? <Login /> : <Register />}
        <div className="text-orange-400 flex items-center justify-center">
          <div className=" flex items-end h-ful cursor-pointer">
            {isLoginPage ? (
              <div className="flex flex-col space-y-3 m-auto items-center h-full">
                <div
                  className="flex justify-center items-center"
                  onClick={onSwitchLogin}
                >
                  Register
                </div>
                <div
                  className="flex justify-center items-center"
                  onClick={onForgetPassword}
                >
                  Forget Password
                </div>
              </div>
            ) : (
              <div
                className="flex justify-center items-center"
                onClick={onSwitchLogin}
              >
                Login
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Profile></Profile>
      </div>
    </>
  );
}

export default App;
