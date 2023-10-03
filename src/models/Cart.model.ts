interface CartModel {
  _id?: string;
  product: ProductModel
  productId?: string;
  userId?: string;
  quantity: number;
}

interface CartsModel {
  products: {
    productId: string;
    quantity: number;
  }[];
  user: UserModel;
}