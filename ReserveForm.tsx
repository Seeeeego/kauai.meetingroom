import React, { useState } from 'react';
import type { CreateReservationRequest } from './type';

interface ReserveFormProps {
  selectedRoomName: string;
  selectedRoomId: number;
  onSubmit: (data: CreateReservationRequest) => void;
}

export const ReserveForm: React.FC<ReserveFormProps> = ({ selectedRoomName, selectedRoomId, onSubmit }) => {
  const [startAt, setStartAt] = useState<string>('');
  const [endAt, setEndAt] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 簡易バリデーション
    if (new Date(startAt) >= new Date(endAt)) {
      setError('終了日時は開始日時よりも後の時間を指定してください。');
      return;
    }

    // 親（ボス）コンポーネントにデータを渡す
    onSubmit({
      roomId: selectedRoomId,
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
      purpose: purpose || undefined,
    });

    // フォームを空にする
    setStartAt('');
    setEndAt('');
    setPurpose('');
  };

  return (
    <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '24px', backgroundColor: '#fafafa' }}>
      <h2>新規予約登録</h2>
      <p style={{ color: '#666' }}>選択中: <strong>{selectedRoomName}</strong></p>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>開始日時</label>
          <input 
            type="datetime-local" 
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>終了日時</label>
          <input 
            type="datetime-local" 
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>利用目的（任意）</label>
          <input 
            type="text" 
            placeholder="例: チーム定例"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

        <button 
          type="submit" 
          style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          予約を確定する
        </button>
      </form>
    </div>
  );
};