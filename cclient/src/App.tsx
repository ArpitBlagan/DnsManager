import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Nabar";
import "./App.css";
import Home from "./pages/Home";
import Guide from "./components/Guide";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Records from "./components/Records";
function App() {
  return (
    <Router>
      <div>
        <Toaster position="top-right" />
      </div>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route
          path="/subscription/resrouceGroup/dnszone"
          element={<Records />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
