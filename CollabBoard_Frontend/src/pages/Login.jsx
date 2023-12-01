import React from "react";
import Base from "../components/Base";
import { loginUser } from "../services/AuthService";
import { GoogleLogin } from "@react-oauth/google";
import { createUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const responseMessage = (response) => {
    const jwt = response.credential;
    if (jwt) {
      localStorage.setItem("access_token", jwt);
      createUser().subscribe((res) => {
        const data = {
          user: res.response,
        };
        loginUser(JSON.stringify(data));
        navigate(`/dashboard/${data.user.id}`);
      });
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Base>
      <div className="h-[91vh] flex justify-center items-center">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Collaborative Workspace!
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Unlock the power of collaboration with our real-time collaborative
            boards.
          </p>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          {/* </GoogleLogin> */}
        </div>
      </div>
    </Base>
  );
};

export default Login;
