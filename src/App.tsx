import { BrowserRouter, Routes, Route , useLocation} from "react-router-dom";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Players from "./pages/game/Players";
import ChooseRole from "./pages/game/ChooseRole";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route element={<Home />} path="/" />
        <Route element={<Learn />} path="learn" />
        <Route element={<Contact />} path="contact" />
        <Route element={<Players />} path="game/start" />
        <Route element={<ChooseRole />} path="game/roles" />
      </Routes>
      </AnimatePresence>
  );
}

export default App;
