import Home from "./pages/Home";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PrivateRoutes } from "./components/PrivateRoutes";
import CreateBoard from "./pages/CreateBoard";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Navigate to={"login"} />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/board/create/:userId" element={<CreateBoard />} />
          <Route path="/board/:boardId" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
