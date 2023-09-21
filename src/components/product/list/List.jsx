import Item from "../item/Item";

function List(props) {
  return (
    <>
      {props.items && props.items.map((item, i) => (
        <div
          className={
            "col-12 mb-4 " + (props.className ? props.className : "col-md-3")
          }
          key={i}
        >
          <Item
            item={item}
            isNavigateToDetailPage={props.isNavigateToDetailPage}
          ></Item>
        </div>
      ))}
    </>
  );
}

export default List;
