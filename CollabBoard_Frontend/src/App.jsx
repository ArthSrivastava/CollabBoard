import Home from "./pages/Home";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
    <ToastContainer position="bottom-center"/>
      <Home />
    </>
  );
}

export default App;
