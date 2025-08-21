import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage/HomePage";
import GeneratePage from "./routes/GeneratePage/GeneratePage";
import ResultPage from "./routes/ResultPage/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
