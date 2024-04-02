import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalendarPage from "./pages/CalendarPage"; 
import CreateDiaryPage from "./pages/CreateDiaryPage";
import MonthlyResultPage from "./pages/MonthlyResultPage"
import SelectCharacterPage from "./pages/SelectCharacterPage";
import MusicResultPage from "./pages/MusicResultPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingPage from "./pages/SettingPage";
import LoginPage from "./pages/LoginPage";
import KakaoRedirectHandler from "./components/user/KakaoRedirectHandler";
import MainPage from "./pages/MainPage";
import CharacterIntroPage from "./pages/CharacterIntroPage";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex justify-between" >
      <div className="flex-grow mr-[134px]">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/oauth" element={<KakaoRedirectHandler />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/monthly-result" element={<MonthlyResultPage />} />
          <Route path="/create-diary" element={<CreateDiaryPage />} />
          <Route path="/select-character" element={<SelectCharacterPage />} />
          <Route path="/music-result" element={<MusicResultPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/character-intro" element={<CharacterIntroPage />} />
        </Routes>
      </div>

      <div>
        <Navigation />
      </div>      
    </div>     
    </BrowserRouter>
  );
}