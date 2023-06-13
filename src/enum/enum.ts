export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum PostEnum {
  deleted = 0,
  onPost = 1,
}

export enum ReactionEnum {
  DEFAULT = 0,
  LIKE_REACT = 1,
  LOVE_REACT = 2,
  HAHA_REACT = 3,
  SAD_REACT = 4,
  ANGRY_REACT = 5,
}
export const ReactionArray = {
  1: 'like_react',
  2: 'love_react',
  3: 'haha_react',
  4: 'sad_react',
  5: 'angry_react',
};

export enum RoomStatus {
  ROOM_NOT_EXIST = 'Not_exist_room',
  ROOM_EXISTED = 'Room_esixt',
  ROOM_CREATED = 'Room_created',
  START_CHAT = 'Start_chat',
  USER_NOT_EXIST = 'Not_exist_suser',
  EXIST_SUSER = 'Exist_user',
  USER_ROOM_EXISTED = 'User_room_existed',
  USER_OUT_ROOM = 'User was outed this room',
}

export enum Status {
  DEFAULT = 0,
  ON = 1,
}
