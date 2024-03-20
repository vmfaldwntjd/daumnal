import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import PlaylistControlModal from '../modal/PlaylistControlModal';

interface PlaylistCardProps {
  playlistId: number;
  playlistName: string;
  playlistCoverUrl: string | null;
  onPlaylistClick: (id: number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlistId, playlistName, playlistCoverUrl, onPlaylistClick }) => {
  const defaultImageUrl = '/image/playlist_default.png';

  const [isOpenInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

  const handleInfoPlaylist = useCallback((playlistId: number) => {
    setSelectedPlaylistId(playlistId);
    setOpenInfoModal(!isOpenInfoModal);
  }, [isOpenInfoModal]);

  const handleMovePlaylist = (playlistId: number) => () => {
    onPlaylistClick(playlistId);
  }

  return (
    <Container>
      <button onClick={handleMovePlaylist(playlistId)}>
        <img
          src={playlistCoverUrl || defaultImageUrl}
          alt="플레이리스트 커버 이미지"
        />
      </button>
      <Wrapper>
        <button className="self-start font-NanumSquare" onClick={handleMovePlaylist(playlistId)}>{playlistName}</button>
        {isOpenInfoModal && (
          <PlaylistModalContainer>
            <PlaylistControlModal onClickToggleModal={handleInfoPlaylist} selectedPlaylistId={selectedPlaylistId} />
          </PlaylistModalContainer>
        )}
        <button className="self-end text-2xl" onClick={() => handleInfoPlaylist(playlistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 220px;
  height: 280px;
  background-color: #FDFBF8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
`;

const PlaylistModalContainer = styled.div`
  position: absolute;
  bottom: -30px;
  right: 20px;
`;

export default PlaylistCard;
