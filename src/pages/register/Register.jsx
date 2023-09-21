import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { toast } from "react-toastify";

function Register(props) {
  const navigate = useNavigate();
  function clickLogoutLinkHandler() {
    navigate("/login");
  }

  const ctx = useContext(AuthContext);
  const emailInputEl = useRef();
  const passwordInputEl = useRef();
  const FullNameInputEl = useRef();
  const PhoneInputEl = useRef();
  const users = JSON.parse(localStorage.getItem("users"));

  function validateUserInput() {
    if (!FullNameInputEl.current.value) {
      toast.warning("Vui lòng nhập Tên!");
      return;
    }
    if (!emailInputEl.current.value) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    if (!passwordInputEl.current.value) {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    if (!PhoneInputEl.current.value) {
      toast.warning("Vui lòng nhập SĐT!");
      return;
    }
    if (passwordInputEl.current.value.length < 8) {
      toast.warning("Mật khẩu chứa ít nhất 8 ký tự!");
      return;
    }
    if (users?.some((u) => u.email === emailInputEl.current.value)) {
      toast.warning("Email này đã được đăng ký!");
      return;
    }

    // Nếu thông tin hợp lệ thì lưu lại
    ctx.onRegister({
      email: emailInputEl.current.value,
      password: passwordInputEl.current.value,
      fullName: FullNameInputEl.current.value,
      phone: PhoneInputEl.current.value,
    });
  }

  // hàm sử lý thông tin nhập vào của trường số điện thoại, chỉ chấp nhận chữ số
  function changePhoneHandler(event) {
    const result = event.target.value.replace(/\D/g, "");
    PhoneInputEl.current.value = result;
  }

  return (
    <section className="vh-100">
      <div
        className="mask d-flex align-items-center h-100 banner"
        style={{ backgroundPositionX: "44%" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card shadow" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5 text-h1 text-muted">
                    Sign Up
                  </h2>

                  <form>
                    <div className="form-outline">
                      <input
                        ref={FullNameInputEl}
                        placeholder="Full Name"
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg rounded-0 py-4 shadow-none"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                      />
                    </div>

                    <div className="form-outline">
                      <input
                        ref={emailInputEl}
                        placeholder="Email"
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg rounded-0 py-4 shadow-none"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                      />
                    </div>

                    <div className="form-outline">
                      <input
                        ref={passwordInputEl}
                        placeholder="Password"
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg rounded-0 py-4 shadow-none"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        ref={PhoneInputEl}
                        placeholder="Phone"
                        type="phone"
                        id="form3Example4cdg"
                        className="form-control form-control-lg rounded-0 py-4 shadow-none"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                        onChange={changePhoneHandler}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-dark w-100 p-3"
                        onClick={validateUserInput}
                      >
                        SIGN UP
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0 fst-italic">
                      <span>Login? </span>
                      <a
                        className="text-decoration-none fw-400"
                        onClick={clickLogoutLinkHandler}
                      >
                        click
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
