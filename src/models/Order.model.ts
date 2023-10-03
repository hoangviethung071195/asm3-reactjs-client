interface OrderModel {
  _id: string;
  products: {
    _id: string;
    product: ProductModel;
    quantity: number;
  }[];
  user: UserModel;
  delivery?: string;
  status?: string;
}

interface OrderInfoModel extends UserModel {
  userId: string
}