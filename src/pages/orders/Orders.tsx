import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/context/AuthContext";
import { getOrdersByUser } from '../../service/orders.service';
import { getVNDTotalAmount } from '../../utils/helpers/order';
import { OrderModel } from 'models/Order.model';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Orders(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    getOrdersByUser(ctx.currentUser!._id!).then((r) => {
      setOrders(r);
      setLoading(false);
    });
  }, []);

  return (
    <LoadingOverlay
      loading={loading}
    >
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">History</h1>
          <p className="text-1 text-muted my-4 pt-2">History</p>
        </div>
      </div>

      <div className="table-responsive pt-5 pb-5 fst-italic main-content">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">ID Order</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">ID User</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Name</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Phone</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Address</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Total</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Delivery</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Status</span>
              </th>
              <th className="border-0 bg-light text-muted" scope="col">
                <span className="text-small text-uppercase">Detail</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!orders?.length &&
              orders.map((o) => (
                <tr className="text-center" key={o._id}>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{o._id}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{o.user.userId}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{o.user.fullName}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{o.user.phone}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{o.user.address}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">
                      {getVNDTotalAmount(o)}
                    </p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">
                      {!o.delivery ? "Waiting for progressing" : "Processed"}
                    </p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">
                      {!o.status ? "Waiting for pay" : "Paid"}
                    </p>
                  </td>
                  <td className="align-middle border-0">
                    <Link
                      className="btn btn-outline-dark btn-sm"
                      to={`/order/${o._id}`}
                    >
                      View <i className="fas fa-long-arrow-alt-right ml-2"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </LoadingOverlay>
  );
}

export default Orders;
