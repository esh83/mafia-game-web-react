import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Players from "./pages/game/Players";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Learn />} path="learn" />
        <Route element={<Contact />} path="contact" />
        <Route element={<Players />} path="game/start" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
