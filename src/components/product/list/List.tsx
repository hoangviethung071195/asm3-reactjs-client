import { ProductModel } from 'models/Product.model';
import Item from "../item/Item";
import { PropsWithChildren } from 'react';

function List(props: PropsWithChildren<{
  products: ProductModel[];
  isNavigateToDetailPage?: boolean;
  className?: string;
}>) {
  return (
    <>
      {props.products && props.products.map((item, i) => (
        <div
          className={
            "mb-4 col-12 col-sm-6 col-lg-3 p-2 " + (props.className ? props.className : "")
          }
          key={i}
        >
          <Item
            product={item}
            isNavigateToDetailPage={props.isNavigateToDetailPage}
          ></Item>
        </div>
      ))}
    </>
  );
}

export default List;
