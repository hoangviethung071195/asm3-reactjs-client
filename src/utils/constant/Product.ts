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