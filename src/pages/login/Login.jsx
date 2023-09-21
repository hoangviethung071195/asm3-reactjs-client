import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { toast } from "react-toastify";

function Login(props) {
  const navigate = useNavigate();
  function clickRegisterLinkHandler() {
    navigate("/register");
  }

  // useContext để lưu trạng thái đăng nhập
  const ctx = useContext(AuthContext);
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // Kiểm tra thông tin người dùng nhập
  function validateUserInput() {
    if (!emailInputEl.current.value) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    if (!passwordInputEl.current.value) {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    if (passwordInputEl.current.value.length < 8) {
      toast.warning("Mật khẩu chứa ít nhất 8 ký tự!");
      return;
    }
    const { value: email } = emailInputEl.current;
    const { value: password } = passwordInputEl.current;
    // Nếu thông tin hợp lệ thì đăng nhập
    ctx.onLogin({
      email,
      password,
    });
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
                    Sign In
                  </h2>

                  <form>
                    <div className="form-outline">
                      <input
                        ref={emailInputEl}
                        placeholder="Email"
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg rounded-0 py-4"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        ref={passwordInputEl}
                        placeholder="Password"
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg rounded-0 py-4"
                        onKeyDown={(event) =>
                          event.key === "Enter" ? validateUserInput() : null
                        }
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-dark w-100 p-3"
                        onClick={validateUserInput}
                      >
                        SIGN IN
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0 fst-italic">
                      <span>Create an account? </span>
                      <a
                        className="text-decoration-none fw-400"
                        onClick={clickRegisterLinkHandler}
                      >
                        Sign up
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

export default Login;
