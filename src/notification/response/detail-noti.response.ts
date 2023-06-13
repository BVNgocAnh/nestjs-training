export class NotiDetailResponse {
  noti_id: number;
  content: string;
  user: UserResponse;
  constructor(data: any) {
    this.noti_id = data?.noti_id;
    this.content = data?.content;
    this.user = data?.user;
  }
  static MaptoList(data: any) {
    return data.map((item) => {
      return new NotiDetailResponse(item.data);
    });
  }
}

export class UserResponse {
  user_id: number;
  username: string;
  permission: string;

  constructor(data: any) {
    this.user_id = data?.user_id;
    this.username = data?.username;
    this.permission = data?.permission;
  }

  static MaptoList(data: any) {
    return new UserResponse(data);
  }
}
