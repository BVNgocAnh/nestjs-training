export class DetailProductResponse {
  name: string;
  info: string;
  price: string;
  size: SizeResponse[];
  id: number;
  image: string;
  code: string;
  feedback: FeedbackResponse[];
  material: MaterialResponse[];

  constructor(data: any) {
    this.name = data.name;
    this.info = data.info;
    this.price = data.price;
    this.size = data.product_size
      ? SizeResponse.MaptoList(data.product_size)
      : [];
    this.id = data.id;
    this.code = data.code;
    this.image = data.image;
    this.feedback = data.feedback
      ? FeedbackResponse.MaptoList(data.feedback)
      : [];
    this.material = data.product_material
      ? MaterialResponse.MaptoList(data.product_material)
      : [];
  }

  static MaptoList(data: any) {
    return new DetailProductResponse(data);
  }
}

export class SizeResponse {
  id: number;
  name: string;
  width: string;
  length: string;

  constructor(data: any) {
    this.name = data?.name;
    this.id = data?.id;
    this.width = data?.width;
    this.length = data?.length;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new SizeResponse(item.size);
    });
  }
}

export class FeedbackResponse {
  id: number;
  title: string;
  comment: string;
  rating: number;

  constructor(data: any) {
    this.title = data?.title;
    this.id = data?.id;
    this.comment = data?.comment;
    this.rating = data?.rating;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new FeedbackResponse(item);
    });
  }
}

export class MaterialResponse {
  material_id: number;
  material_name: string;
  description: string;

  constructor(data: any) {
    this.material_name = data?.material_name;
    this.material_id = data?.material_id;
    this.description = data?.description;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new MaterialResponse(item.material);
    });
  }
}
