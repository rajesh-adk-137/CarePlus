import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FillUp from "./pages/FillUp";
import AboutPage from "./pages/AboutPage";
import AuthPage from './pages/AuthPage';
import AiResponse from "./pages/AiResponse";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<FillUp/>} />
          <Route exact path="/about" element={<AboutPage/>} />
          <Route exact path="/auth" element={<AuthPage />} />
          <Route exact path="/response" element={<AiResponse />} />
        </Routes>
      </Router>
    </>
  )
}