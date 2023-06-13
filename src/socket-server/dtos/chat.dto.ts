export class RoomDto {
  room_id: number;
  room_name: string;
}

export class MessageDto {
  content: string;
  room_id: number;
}

export class ConnectDto {
  room_id: number;
  user_id: number;
}
