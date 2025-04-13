import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const {authenticated} = useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={authenticated?<Home />:<Login/>} />
          <Route path="/login" element={authenticated?<Home />:<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
