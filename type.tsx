export interface Room {
  id: number;
  name: string;
  capacity: number;
  description?: string;
}

export interface CreateReservationRequest {
  roomId: number;
  startAt: string;
  endAt: string;
  purpose?: string;
}

// 💡 追加：画面に表示するための予約データの型
export interface Reservation {
  id: string; // 一意のID
  roomName: string; // 会議室名
  startAt: string; // 開始日時
  endAt: string; // 終了日時
  purpose: string; // 利用目的
}