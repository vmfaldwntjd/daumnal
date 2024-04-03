// 플레이리스트 페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MusicPlay from '../components/music/MusicPlay';
import PlaylistList from '../components/music/PlaylistList';
import PlaylistDetail from '../components/music/PlaylistDetail';

interface Musics {
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string;
  musicLyrics: string;
}

const PlaylistPage: React.FC = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(true); // 현재 재생 상태를 저장하는 상태 변수(기본값 false)
  const [nowMusicId, setNowMusicId] = useState<number | null>(null);
  const [nowPlaylistId, setNowPlaylistId] = useState<number | null>(null);
  const [changeMusicId, setChangeMusicId] = useState<number | null>(null);
  const [changePlaylistId, setChangePlaylistId] = useState<number | null>(null);
  const [musics, setMusics] = useState<Musics[]>([]); // 플레이리스트 내부 노래 목록

  // 선택한 플레이리스트 상세 컴포넌트로 교체하는 함수
  const handlePlaylistSelect = (id: number) => {
    setSelectedPlaylistId(id);
  };

  useEffect(() => {
    setChangeMusicId(nowMusicId)
    setChangePlaylistId(nowPlaylistId)
  }, [nowMusicId, nowPlaylistId])

  return (
    <div className='flex'>
      <LeftBox>
        {/* 플레이리스트 선택 상태에 따라서 */}
        {selectedPlaylistId !== null ? (
          // 플레이리스트 상세 컴포넌트 렌더링
          <PlaylistDetail 
            selectedPlaylistId={selectedPlaylistId}
            setSelectedPlaylistId={setSelectedPlaylistId}
            playing={playing}
            setPlaying={setPlaying}
            nowMusicId={nowMusicId}
            setNowMusicId={setNowMusicId}
            setNowPlaylistId={setNowPlaylistId}
            musics={musics}
            setMusics={setMusics}
          />
        ) : (
          // 플레이리스트 목록 컴포넌트 렌더링
          <PlaylistList onPlaylistSelect={handlePlaylistSelect} />
        )}
      </LeftBox>
      <RightBox>
        {/* 노래 재생 */}
        <MusicPlay
          playing={playing}
          setPlaying={setPlaying}
          changeMusicId={changeMusicId}
          changePlaylistId={changePlaylistId}
          musics={musics}
        />
      </RightBox>
    </div>
  );
};

const LeftBox = styled.div`
  width: calc(70%);
  height: 100%;
`;

const RightBox = styled.div`
  width: calc(30%);
  height: 100%;
  background-color: #FFFCF7;
`;

export default PlaylistPage;