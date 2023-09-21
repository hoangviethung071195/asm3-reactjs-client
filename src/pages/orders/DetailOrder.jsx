import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../../service/products.service";

function DetailOrder(props) {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();

  useEffect(() => {
    getOrder(orderId).then((r) => {
      console.log("r ", r);
      if (r) {
        setOrder(r);
      }
    });
  }, []);

  return (
    <>
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">Detail Order</h1>
          <p className="text-1 text-muted my-4 pt-3">Detail</p>
        </div>
      </div>

      <div className="p-5 fst-italic">
        <h1 className="h2 text-uppercase">Information Order</h1>
        <div className="text-muted">
          <p>ID User: {order?.user?.userId}</p>
          <p>Full Name: {order?.user?.fullName}</p>
          <p>Phone: {order?.user?.phone}</p>
          <p>Address: {order?.user?.address}</p>
          <p>
            Total:{" "}
            {new Intl.NumberFormat("vi-VI", {
              style: "currency",
              currency: "VND",
            }).format(
              order?.products?.reduce(
                (a, b) => a + +b.product.price * b.quantity,
                0
              )
            )}
          </p>
        </div>
      </div>

      <div className="table-responsive pt-5 pb-5 fst-italic">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center bg-light">
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  ID Product
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Image
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Name
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Price
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Count
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.products &&
              order?.products?.map((p) => (
                <tr className="text-center" key={p._id}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{p.product._id}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <Link
                        className="reset-anchor d-block animsition-link"
                        to={`/detail/${p.product._id}`}
                      >
                        <img
                          src={
                            p.product.imageUrl1.includes("://")
                              ? p.product.imageUrl1
                              : p.product.imageUrl1
                          }
                          alt={p.product.imageUrl1}
                          width="200"
                        />
                      </Link>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{p.product.title}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "VND",
                      }).format(p.product.price)}
                    </h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{p.quantity}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DetailOrder;
