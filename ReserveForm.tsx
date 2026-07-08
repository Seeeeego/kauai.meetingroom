import React, { useState } from 'react';
import type { CreateReservationRequest } from './type';

interface ReserveFormProps {
  selectedRoomName: string;
  selectedRoomId: number;
  onSubmit: (data: CreateReservationRequest) => void;
}

export const ReserveForm = ({ selectedRoomName, selectedRoomId, onSubmit }: ReserveFormProps) => {
  // フォームの入力値を1つのオブジェクト型Stateに集約
  const [form, setForm] = useState({
    startAt: '',
    endAt: '',
    purpose: '',
  });
  
  const [error, setError] = useState<string | null>(null);

  // すべての入力を一括で処理する変更ハンドラー
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 簡易日時バリデーション
    if (new Date(form.startAt) >= new Date(form.endAt)) {
      setError('終了日時は開始日時よりも後の時間を指定してください。');
      return;
    }

    // ボス（Dashboard）に入力データを渡す
    onSubmit({
      roomId: selectedRoomId,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString(),
      purpose: form.purpose || undefined,
    });

    // フォームをまとめて初期化
    setForm({
      startAt: '',
      endAt: '',
      purpose: '',
    });
  };

  return (
    <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '24px', backgroundColor: '#fafafa' }}>
      <h2>新規予約登録</h2>
      <p style={{ color: '#666' }}>選択中: <strong>{selectedRoomName}</strong></p>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        <div>
          <label htmlFor="startAt" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>開始日時</label>
          <input 
            id="startAt"
            name="startAt"
            type="datetime-local" 
            value={form.startAt}
            onChange={handleForm}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label htmlFor="endAt" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>終了日時</label>
          <input 
            id="endAt"
            name="endAt"
            type="datetime-local" 
            value={form.endAt}
            onChange={handleForm}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label htmlFor="purpose" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>利用目的（任意）</label>
          <input 
            id="purpose"
            name="purpose"
            type="text" 
            placeholder="例: チーム定例"
            value={form.purpose}
            onChange={handleForm}
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