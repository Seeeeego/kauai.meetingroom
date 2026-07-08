import React, { useState } from 'react';
import type { Room, CreateReservationRequest, Reservation } from './type'; // 💡 Reservationを追加
import { RoomList } from './RoomList';
import { ReserveForm } from './ReserveForm';

const MOCK_ROOMS: Room[] = [
  { id: 1, name: '会議室A (大)', capacity: 12, description: 'プロジェクター・ホワイトボード完備' },
  { id: 2, name: '会議室B (中)', capacity: 6, description: 'モニター有、Web会議最適' },
  { id: 3, name: '面談室C (小)', capacity: 2, description: '個別面談用' },
];

export const Dashboard = () => {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(MOCK_ROOMS[0].id);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 💡 追加：予約一覧を管理するState（初期状態は空配列）
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // 日時を読みやすい形式（YYYY/MM/DD HH:mm）に変換するユーティリティ
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReserveSubmit = (data: CreateReservationRequest) => {
    setSuccessMessage(null);
    
    console.log('API送信データ:', data);

    // 💡 追加：新しい予約オブジェクトを作成して、既存の一覧（State）の先頭に追加
    const newReservation: Reservation = {
      id: crypto.randomUUID(), // ランダムなユニークIDを生成
      roomName: selectedRoom.name,
      startAt: formatDateTime(data.startAt),
      endAt: formatDateTime(data.endAt),
      purpose: data.purpose || '（未入力）'
    };

    setReservations(prev => [newReservation, ...prev]); // 新しい予約を一番上に配置

    setSuccessMessage(`${selectedRoom.name}の予約が完了しました！`);
    
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

      {/* 上段：会議室選択と予約フォーム */}
      <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
        <RoomList 
          rooms={rooms} 
          selectedRoomId={selectedRoomId} 
          onSelectRoom={setSelectedRoomId} 
        />

        <ReserveForm 
          selectedRoomName={selectedRoom.name} 
          selectedRoomId={selectedRoomId}
          onSubmit={handleReserveSubmit}
        />
      </div>

      {/* 💡 追加：下段に予約一覧をその場で表示 */}
      <div style={{ marginTop: '48px', borderTop: '2px solid #eee', paddingTop: '24px' }}>
        <h2>現在の予約一覧</h2>
        {reservations.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic', marginTop: '16px' }}>現在、予約はありません。上のフォームから登録してください。</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px 8px' }}>会議室名</th>
                <th style={{ padding: '12px 8px' }}>開始日時</th>
                <th style={{ padding: '12px 8px' }}>終了日時</th>
                <th style={{ padding: '12px 8px' }}>利用目的</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold', color: '#0070f3' }}>{res.roomName}</td>
                  <td style={{ padding: '12px 8px' }}>{res.startAt}</td>
                  <td style={{ padding: '12px 8px' }}>{res.endAt}</td>
                  <td style={{ padding: '12px 8px', color: '#555' }}>{res.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};