import React from 'react';

interface MusicContextProps {
  nowPlaying: boolean;
  setNowPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  nowMusicId: number | null;
  setNowMusicId: React.Dispatch<React.SetStateAction<number | null>>;
  nowPlaylistId: number | null;
  setNowPlaylistId: React.Dispatch<React.SetStateAction<number | null>>;
}

const MusicContext = React.createContext<MusicContextProps | null>(null);

export default MusicContext;
