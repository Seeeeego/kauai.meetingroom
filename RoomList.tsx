import type { Room } from './type';

interface RoomListProps {
  rooms: Room[];
  selectedRoomId: number;
  onSelectRoom: (id: number) => void;
}

export const RoomList = ({ rooms, selectedRoomId, onSelectRoom }: RoomListProps) => {
  return (
    <div style={{ flex: 1 }}>
      <h2>会議室一覧</h2>
      <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
        {rooms.map((room) => (
          <div 
            key={room.id} 
            style={{
              border: `2px solid ${selectedRoomId === room.id ? '#0070f3' : '#ccc'}`,
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              backgroundColor: selectedRoomId === room.id ? '#f0f7ff' : '#fff'
            }}
            onClick={() => onSelectRoom(room.id)}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>{room.name}</h3>
            <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>定員: {room.capacity}名</p>
            {room.description && (
              <p style={{ margin: '4px 0', color: '#888', fontSize: '13px' }}>設備: {room.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;