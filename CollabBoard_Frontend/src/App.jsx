import Home from "./pages/Home";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { PrivateRoutes } from "./components/PrivateRoutes";
import CreateBoard from "./pages/Dashboard";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <UserProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to={"login"} />} />

          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/dashboard/:userId" element={<CreateBoard />} />
            <Route path="/board/:boardId" element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
