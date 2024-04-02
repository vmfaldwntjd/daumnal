import React from 'react';
import ReactPlayer from 'react-player';

interface DiaryMusicPlayBarProps {
  backgroundMusicYoutubeId?: string;
  playState: boolean; // true or false 상태를 받음
}

const DiaryMusicPlayBar: React.FC<DiaryMusicPlayBarProps> = ({ backgroundMusicYoutubeId, playState }) => {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${backgroundMusicYoutubeId}`}
      controls={false}
      width="0"
      height="0"
      playing={playState}
      loop={true}
    />
  );
};

export default DiaryMusicPlayBar;
