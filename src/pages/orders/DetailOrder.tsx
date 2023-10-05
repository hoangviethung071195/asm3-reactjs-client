import ImageLoader from 'components/image-loader/ImageLoader';
import { OrderModel } from 'models/Order.model';
import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from '../../service/orders.service';
import { initialOrder } from '../../utils/constant/models/orders';
import { getVNDTotalAmount, getVNDUnit } from '../../utils/helpers/order';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function DetailOrder(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderModel>(initialOrder);
  const { orderId } = useParams();

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId).then((r) => {
      if (r) {
        setOrder(r);
      }
      setLoading(false);
    });
  }, []);

  return (
    <LoadingOverlay
      loading={loading}
    >
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">Detail Order</h1>
          <p className="text-1 text-muted my-4 pt-2">Detail</p>
        </div>
      </div>

      <div className="p-5 fst-italic">
        <h1 className="h2 text-uppercase">Information Order</h1>
        <div className="text-muted">
          <p>Email: {order?.user?.email}</p>
          <p>Full Name: {order?.user?.fullName}</p>
          <p>Phone: {order?.user?.phone}</p>
          <p>Address: {order?.user?.address}</p>
          <p>
            Total:{" "}
            {getVNDTotalAmount(order)}
          </p>
        </div>
      </div>

      <div className="table-responsive pt-5 pb-5 fst-italic">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center bg-light">
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  No
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Name
                </span>
              </th>
              <th className="border-0 bg-light" scope="col">
                <span className="text-small text-muted text-uppercase">
                  Image
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
              order?.products?.map((p, i) => (
                <tr className="text-center" key={p._id}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">
                      {++i}
                    </h6>
                  </td>
                  <td className="align-middle border-0 min-w-140">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${p.product._id}`}
                    >
                      <h6 className="mb-0">{p.product.title}</h6>
                    </Link>
                  </td>
                  <td className="pl-0 border-0 max-w-50">
                    <div className="media align-items-center justify-content-center">
                      <ImageLoader fileId={p.product.fileIds?.[0]} fileIds={p.product.fileIds} />
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">
                      {getVNDUnit(p.product.price)}
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
    </LoadingOverlay>
  );
}

export default DetailOrder;
