import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import StatsPage from "./components/StatsPage";
import Pnf from "./components/Pnf";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Pnf />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
