import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/context/AuthContext";
import { toast } from "react-toastify";
import { PropsWithChildren } from 'react';
import AuthLayout from 'layout/auth/Auth';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Login(props: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function clickRegisterLinkHandler() {
    navigate("/register");
  }

  // useContext để lưu trạng thái đăng nhập
  const ctx = useContext(AuthContext);
  const emailInputEl = useRef<HTMLInputElement>(null);
  const passwordInputEl = useRef<HTMLInputElement>(null);

  // Kiểm tra thông tin người dùng nhập
  function validateUserInput() {
    if (!emailInputEl.current?.value) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    if (!passwordInputEl.current?.value) {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    if (passwordInputEl.current?.value.length < 8) {
      toast.warning("Mật khẩu chứa ít nhất 8 ký tự!");
      return;
    }
    const { value: email } = emailInputEl.current;
    const { value: password } = passwordInputEl.current;
    // Nếu thông tin hợp lệ thì đăng nhập
    setLoading(true);
    ctx.onLogin({
      email,
      password,
    }).then(() => setLoading(false));
  }

  return (
    <LoadingOverlay
      loading={loading}
    >
      <AuthLayout title='sign in'>
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
              defaultValue={'customer@gmail.com'}
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
              defaultValue={'hungnho123'}
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
      </AuthLayout>
    </LoadingOverlay>
  );
}

export default Login;
