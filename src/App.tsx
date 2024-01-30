import { CategoryForm2 } from "./components/CategoryForm2";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/category/form" element={<CategoryForm2 />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

const Login = () => <div>Login Page</div>;
const Verify = () => <div>Verify Page</div>;

export default App;
