export class ProductResponse {
  product_id: number;
  name_product: string;
  name_product_clone: string;
  description: string;
  status: number;
  quantity: number;
  inStock: number;

  user: UserResponse[];

  constructor(data: any) {
    this.product_id = data?.product_id;
    this.name_product = data?.name_product;
    this.name_product_clone = data?.name_product_clone;
    this.description = data?.description;
    this.status = data?.status;
    this.quantity = data?.quantity;
    this.inStock = data?.inStock;
    this.user = data.products_bought_user
      ? UserResponse.MaptoList(data.products_bought_user)
      : [];
  }

  static MaptoList(data: any) {
    return new ProductResponse(data);
  }
}
export class UserResponse {
  user_id: number;
  firstname: string;
  lastname: string;
  address: string;
  permission: string;
  birthday: string;

  constructor(data: any) {
    this.user_id = data?.user_id;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.address = data?.address;
    this.permission = data?.permission;
    this.birthday = data?.birthday;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new UserResponse(item.users);
    });
  }
}

//   export class FeedbackResponse {
//     id: number;
//     title: string;
//     comment: string;
//     rating: number;

//     constructor(data: any) {
//       this.title = data?.title;
//       this.id = data?.id;
//       this.comment = data?.comment;
//       this.rating = data?.rating;
//     }

//     static MaptoList(data: any) {
//       return data.map((item) => {
//         return new FeedbackResponse(item);
//       });
//     }
//   }

//   export class MaterialResponse {
//     material_id: number;
//     material_name: string;
//     description: string;

//     constructor(data: any) {
//       this.material_name = data?.material_name;
//       this.material_id = data?.material_id;
//       this.description = data?.description;
//     }

//     static MaptoList(data: any) {
//       return data.map((item) => {
//         return new MaterialResponse(item.material);
//       });
//     }
//   }
