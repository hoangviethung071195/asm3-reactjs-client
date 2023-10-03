import { OptionModel } from 'models/Option.model';
import { ProductModel } from 'models/Product.model';

const listProductFieldsAvailableSorting: (keyof ProductModel)[] = [
  'title',
  'category',
  'price',
];

export const listProductFieldSorting: OptionModel<string>[]
  = listProductFieldsAvailableSorting.map(option => ({
    label: option,
    value: option
  }));