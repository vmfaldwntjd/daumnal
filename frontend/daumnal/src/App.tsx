import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalendarPage from "./pages/CalendarPage"; 
import CreateDiaryPage from "./pages/CreateDiaryPage";
import PlaylistListPage from "./pages/PlaylistListPage";
import SettingPage from "./pages/SettingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/calendarpage" element={<CalendarPage />} />
        <Route path="/creatediarypage" element={<CreateDiaryPage />} />
        <Route path="/playlistlistpage" element={<PlaylistListPage />} />
        <Route path="/settingpage" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
