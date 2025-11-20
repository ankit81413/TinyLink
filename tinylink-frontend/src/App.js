import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Stats from "./Pages/Stats.js";
import Navbar from "./components/Navbar.js";
import AddLinkForm from "./components/AddLinkForm.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<Stats />} />
        <Route path="/add-link" element={<AddLinkForm />} />
      </Routes>
    </>
  );
}

export default App;
