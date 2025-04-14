import { useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import SingleQuestion from "./pages/SingleQuestion";
import AskQuestion from "./pages/askQuestion";



function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      Navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<AskQuestion/>}/>
        <Route path="/answer/:id" element={<SingleQuestion/>}/>
      </Routes>
    </AppState.Provider>
  );
}
export const AppState = createContext();

export default App;
