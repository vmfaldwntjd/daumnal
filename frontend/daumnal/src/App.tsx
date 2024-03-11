import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalendarPage from "./pages/CalendarPage"; 
import CreateDiaryPage from "./pages/CreateDiaryPage";
import SelectCharacterPage from "./pages/SelectCharacterPage";
import PlaylistListPage from "./pages/PlaylistListPage";
import SettingPage from "./pages/SettingPage";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex justify-between" >
      <div className="flex-grow">
      <Routes>
        <Route path="/calendarpage" element={<CalendarPage />} />
        <Route path="/creatediarypage" element={<CreateDiaryPage />} />
        <Route path="/selectcharacterpage" element={<SelectCharacterPage />} />
        <Route path="/playlistlistpage" element={<PlaylistListPage />} />
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