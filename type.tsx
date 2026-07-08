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