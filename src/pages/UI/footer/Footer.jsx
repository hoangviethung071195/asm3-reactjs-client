import { useContext } from "react";
import AuthContext from "../../../store/auth-context";

function Footer(props) {
  const ctx = useContext(AuthContext);
  return (
    <>
      {/* Nếu có dữ liệu người dùng thì mới hiển thị trang này */}
      {ctx.currentUser && (
        <footer className="bg-dark" id="tempaltemo_footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 py-5">
                <p className="text-h2 text-uppercase text-light pb-3">
                  customer services
                </p>
                <ul className="list-unstyled text-light footer-link-list">
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Help & contact us
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Returns & refunds
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Online stores
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Terms & conditions
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 pt-5">
                <p className="text-h2 text-uppercase text-light pb-3">
                  Company
                </p>
                <ul className="list-unstyled text-light footer-link-list">
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      What we do
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Available services
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      latest posts
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 pt-5">
                <p className="text-h2 text-uppercase text-light pb-3">
                  social media
                </p>
                <ul className="list-unstyled text-light footer-link-list">
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="pt-0">
                    <a
                      className="text-decoration-none text-2 text-capitalize text-hover"
                      href="#"
                    >
                      Pinterest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
