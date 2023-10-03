import { ProductModel } from 'models/Product.model';
import { CATEGORIES } from '../Category';

export const initialProduct: ProductModel = {
  category: CATEGORIES[0].value as string,
  description: '',
  longDescription: '',
  price: '',
  title: '',
};