import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Players from "./pages/game/Players";
import ChooseRole from "./pages/game/ChooseRole";
import { AnimatePresence } from "framer-motion";
import ShowRoles from "./pages/game/ShowRoles";
import Manager from "./pages/game/Manager";
import MafiaShot from "./pages/game/night/MafiaShot";
import MafiaSave from "./pages/game/night/MafiaSave";
import CitySave from "./pages/game/night/CitySave";
import Detective from "./pages/game/night/Detective";
import Sniper from "./pages/game/night/Sniper";
import Armour from "./pages/game/night/Armour";
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
        <Route element={<ShowRoles />} path="game/showRoles" />
        <Route element={<Manager />} path="game/manager" />
        <Route element={<MafiaShot />} path="game/night/mafia-shot" />
        <Route element={<MafiaSave />} path="game/night/mafia-save" />
        <Route element={<CitySave />} path="game/night/city-save" />
        <Route element={<Detective />} path="game/night/detective" />
        <Route element={<Sniper />} path="game/night/sniper" />
        <Route element={<Armour />} path="game/night/armour" />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
