import { ProductModel } from './Product.model';
import { UserModel } from './User.model';

export interface OrderModel {
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

export interface OrderInfoModel extends UserModel {
  userId: string
}