import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalendarPage from "./pages/CalendarPage"; 
import CreateDiaryPage from "./pages/CreateDiaryPage";
import SelectCharacterPage from "./pages/SelectCharacterPage";
import MusicResultPage from "./pages/MusicResultPage";
import PlaylistPage from "./pages/PlaylistPage";
import SettingPage from "./pages/SettingPage";
import LoginPage from "./pages/LoginPage";
import KakaoRedirectHandler from "./components/user/KakaoRedirectHandler";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex justify-between" >
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth" element={<KakaoRedirectHandler />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/calendarpage" element={<CalendarPage />} />
        <Route path="/creatediarypage" element={<CreateDiaryPage />} />
        <Route path="/selectcharacterpage" element={<SelectCharacterPage />} />
        <Route path="/musicresultpage" element={<MusicResultPage />} />
        <Route path="/playlistpage" element={<PlaylistPage />} />
        <Route path="/settingpage" element={<SettingPage />} />
      </Routes>
      </div>

      <div className="h-screen">
        <Navigation />
      </div>      
    </div>     
    </BrowserRouter>
  );
}