import React, { useState } from 'react';

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nickname: string) => void;
  isFromSettingPage?: boolean; // 설정 페이지에서 열렸는지 여부를 나타내는 새로운 prop
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onClose, onSubmit, isFromSettingPage = false }) => {
  const [nickname, setNickname] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-bg_nav p-6 rounded-lg shadow-lg"
        style={{ width: '700px', height: '600px', transform: 'translateX(-50px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="flex justify-center">
          <img src="/image/login_logo.png" alt="로그인 로고" style={{width: '330px', height: '198px'}}/>
        </div>
        <div className="flex space-x-4">
          <img src="/image/dabom.png" alt="다봄이" style={{width: '165px',height: '207px',margin: 'auto'}}/>
          <img src="/image/dareum.png" alt="다름이" style={{width: '165px',height: '207px',margin: 'auto'}}/> 
          <img src="/image/daeul.png" alt="다을이" style={{width: '165px',height: '207px',margin: 'auto'}}/> 
          <img src="/image/daseol.png" alt="다설이" style={{width: '165px',height: '207px',margin: 'auto'}}/>   
        </div>
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="border-2 border-gray-200 p-2 w-full rounded-md text-center"
          />
          <div className="flex justify-center mt-4">
            <button
                onClick={() => onSubmit(nickname)}
                className="bg-bg_button hover:bg-bg_button text-black font-bold py-2 px-4 rounded-lg mr-2"
                style={{ color: '#696864' }}>
                확인
            </button>
            {isFromSettingPage && (
              <button
                onClick={onClose} // "취소" 버튼 클릭 시 onClose 함수를 호출하여 모달을 닫음
                className="bg-bg_button hover:bg-bg_button text-black font-bold py-2 px-4 rounded-lg"
                style={{ color: '#696864' }}
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
