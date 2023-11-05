import React, { useState } from "react";
import Base from "../components/Base";
import {
  Card,
  Input,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";

const Signup = () => {
  //store the signup form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //handle fields like email, name, password
  const handleFormChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //validate user data fields
  const validateDataObj = () => {
    let errMessage = "";
    if (data.name === "" || data.name.length < 3 || data.name.length > 40) {
      errMessage = "Name must be of length 3 to 40 characters!";
    } else if (data.email === "") {
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

    if (!validateDataObj()) {
      return;
    }

    registerUser(data).subscribe({
      next: (v) => {
        toast.success("User registered successfully!");
        console.log("user:", v);
      },
      error: (e) => console.log("Error:", e),
    });
    resetForm();
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
  };

  const signupForm = () => {
    return (
      <Card
        color="transparent"
        className="w-auto h-[28rem] border-0 p-4 text-[#080808] rounded-2xl drop-shadow-xl flex items-center bg-opacity-80 backdrop-filter backdrop-blur-lg"
      >
        <Typography
          variant="h2"
          className="sm:text-3xl md:text-4xl text-xl"
          color="white"
        >
          Sign Up
        </Typography>
        {/* <Typography
          className="mt-2 font-normal sm:text-2xl md:text-4xl text-sm"
          variant="h4"
          color="white"
        >
          Enter your details
        </Typography> */}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6 text-lg">
            <Input
              size="lg"
              color="white"
              label="Name"
              className="sm:text-lg text-sm"
              onChange={handleFormChange}
              name="name"
              value={data.name}
            />
            <Input
              size="lg"
              color="white"
              label="Email"
              className="text-lg text-sm"
              onChange={handleFormChange}
              name="email"
              value={data.email}
            />
            <Input
              size="lg"
              color="white"
              label="Password"
              className="text-lg text-sm"
              type="password"
              onChange={handleFormChange}
              name="password"
              value={data.password}
            />
          </div>
          <Button
            className="mt-16 border-limeShade text-limeShade hover:bg-limeShade hover:text-white"
            variant="outlined"
            fullWidth
            ripple={true}
            onClick={handleFormSubmit}
          >
            Signup
          </Button>
        </form>
      </Card>
    );
  };

  return (
    <Base>
      <div className="h-[40rem] flex justify-center items-center">
        {signupForm()}
      </div>
    </Base>
  );
};

export default Signup;
