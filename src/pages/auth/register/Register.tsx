import { ChangeEvent, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PropsWithChildren } from 'react';
import AuthContext from 'store/context/auth-context';
import AuthLayout from 'layout/auth/Auth';

function Register(props: PropsWithChildren) {
  const navigate = useNavigate();
  function clickLogoutLinkHandler() {
    navigate("/login");
  }

  const ctx = useContext(AuthContext);
  const emailInputEl = useRef<HTMLInputElement>(null);
  const passwordInputEl = useRef<HTMLInputElement>(null);
  const FullNameInputEl = useRef<HTMLInputElement>(null);
  const PhoneInputEl = useRef<HTMLInputElement>(null);

  function validateUserInput() {
    if (!FullNameInputEl.current?.value) {
      toast.warning("Vui lòng nhập Tên!");
      return;
    }
    if (!emailInputEl.current?.value) {
      toast.warning("Vui lòng nhập email!");
      return;
    }
    if (!passwordInputEl.current?.value) {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    if (!PhoneInputEl.current?.value) {
      toast.warning("Vui lòng nhập SĐT!");
      return;
    }
    if (passwordInputEl.current?.value.length < 8) {
      toast.warning("Mật khẩu chứa ít nhất 8 ký tự!");
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
  function changePhoneHandler(event: ChangeEvent<HTMLInputElement>) {
    const result = event.target.value.replace(/\D/g, '');
    PhoneInputEl.current!.value = result;
  }

  return (
    <AuthLayout title='Sign Up'>
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
    </AuthLayout>
  );
}

export default Register;
