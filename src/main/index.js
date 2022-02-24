import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Web from "./website";
import Login from "./auth/signin";
import Register from "./auth/register";
import Terms from "./auth/termsAndConditions";
import MainApp from "./app";

export default function Main(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Web />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
