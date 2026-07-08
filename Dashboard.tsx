import React, { useState } from 'react';
import type { Room, CreateReservationRequest } from './type';
import { RoomList } from './RoomList';
import { ReserveForm } from './ReserveForm';

const MOCK_ROOMS: Room[] = [
  { id: 1, name: '会議室A (大)', capacity: 12, description: 'プロジェクター・ホワイトボード完備' },
  { id: 2, name: '会議室B (中)', capacity: 6, description: 'モニター有、Web会議最適' },
  { id: 3, name: '面談室C (小)', capacity: 2, description: '個別面談用' },
];

export const Dashboard: React.FC = () => {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(MOCK_ROOMS[0].id);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 現在選択されている会議室の情報を探す
  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // フォームからデータを受け取って処理する関数
  const handleReserveSubmit = (data: CreateReservationRequest) => {
    setSuccessMessage(null);
    
    // ここでバックエンドのAPIを叩くイメージです
    console.log('APIに送信するデータ:', data);

    setSuccessMessage(`${selectedRoom.name}の予約が完了しました！`);
    
    // 3秒後に成功メッセージを消す
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>会議室予約ダッシュボード</h1>
      
      {successMessage && (
        <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '16px', borderRadius: '4px', margin: '16px 0', fontWeight: 'bold' }}>
          {successMessage}
        </div>
      )}

      <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
        {/* 会議室一覧部品 */}
        <RoomList 
          rooms={rooms} 
          selectedRoomId={selectedRoomId} 
          onSelectRoom={setSelectedRoomId} 
        />

        {/* 予約フォーム部品 */}
        <ReserveForm 
          selectedRoomName={selectedRoom.name} 
          selectedRoomId={selectedRoomId}
          onSubmit={handleReserveSubmit}
        />
      </div>
    </div>
  );
};