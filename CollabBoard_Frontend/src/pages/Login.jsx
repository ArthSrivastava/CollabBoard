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
    if(jwt) {
      console.log("JWT:", jwt)
      localStorage.setItem('access_token', jwt);
      createUser().subscribe((res) => {
        console.log("USERINFO:", res.response)
        const data = {
          user: res.response
        }
        loginUser(JSON.stringify(data))
        navigate(`/board/create/${data.user.id}`)
      })
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Base>
      <div className="h-[91vh] flex justify-center items-center">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </Base>
  );
};

export default Login;
