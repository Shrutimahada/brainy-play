import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/emojigame";
import NumberSequenceGame from "./pages/numbersequence";
import PatternGame from "./pages/patterngame"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emoji" element={<Game />} />
        <Route path="/number" element={<NumberSequenceGame />} />
        <Route path="/colors" element={<PatternGame />} />
      </Routes>
    </BrowserRouter>
  );
}
