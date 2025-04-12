import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/task" element={<AddTask/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
