import React, { useContext } from "react";
import Base from "../components/Base";
import { useState } from "react";
import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleFormChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //validate fields
  const validateData = () => {
    let errMessage = "";
    if (data.email === "") {
      errMessage = "Email should be in correct format!";
    } else if (data.password.length < 3 || data.password.length > 30) {
      errMessage = "Password must be 3 to 30 characters long!";
    }
    if (errMessage !== "") {
      toast.error(errMessage);
    }
    return errMessage === "";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(!validateData()) {
      return;
    }

    console.log("HELLO from submit:", data);
    try {
      loginUser(data).subscribe({
        next: (v) => {
          toast.success("Login successful!")
          // console.log("Logged in successfully:", v);
          console.log("V>RESPONSE:", v.response)
          localStorage.setItem("data", JSON.stringify(v.response))
          navigate(`/board/create/${v.response.id}`);
        },
        error: (e) => {
          toast.error("Login failed!");
          console.log("Error:", e)
        }
      })
    } catch (error) {
      console.log("ERROR:", error)
      // if (error.response.status == 401)
      //   toast.error(error.response.data.message);
      // else 
      //   serverSideErrors(error);
      }
  };

  const loginForm = () => {
    return (
      <Card
        color="transparent"
        className="w-auto h-[25rem] border-0 p-4 text-[#080808] rounded-2xl drop-shadow-xl flex items-center bg-opacity-80 backdrop-filter backdrop-blur-lg"
      >
        <Typography variant="h2" color="white">Log In</Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6 text-lg">
            <Input
              size="lg"
              color="white"
              label="Email"
              className="text-lg"
              onChange={handleFormChange}
              name="email"
            />
            <Input
              size="lg"
              color="white"
              label="Password"
              className="text-lg"
              type="password"
              onChange={handleFormChange}
              name="password"
            />
          </div>
          <Button
            className="mt-20 border-limeShade text-limeShade hover:bg-limeShade hover:text-white"
            variant="outlined"
            fullWidth
            ripple={true}
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </form>
      </Card>
    );
  };
  return (
    <Base>
      <div className="h-[91vh] flex justify-center items-center">
        {loginForm()}
      </div>
    </Base>
  );
};

export default Login;
