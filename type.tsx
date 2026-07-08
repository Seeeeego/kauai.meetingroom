// 会議室情報
export interface Room {
  id: number;
  name: string;
  capacity: number;
  description?: string;
}

// 予約フォーム
export interface CreateReservationRequest {
  roomId: number;
  startAt: string;
  endAt: string;
  purpose?: string;
}

// 予約状況管理
export interface Reservation {
  id: string; 
  roomName: string; 
  startAt: string; 
  endAt: string; 
  purpose: string;
}