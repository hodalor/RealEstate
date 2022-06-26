import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Notify from "../../components/notification";
import { AuthContext } from "../../libs/contexts/authContext";

export default function Login() {
  const { _handleLogin, _handleChange, authState, loading } =
    useContext(AuthContext);

  return (
    <div className="site-wrapper overflow-hidden position-relative">
      {/* Sign In Area */}
      <div className="sign-in-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 position-static d-none d-lg-block">
              <div className="inner-page-left-bg">
                <img src="../assets/image/landing-7/slider-3.png" alt="back" />
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <div className="sign-in-3-box  justify-content-lg-end">
                <div className="heading">
                  <h2>Sign in</h2>
                  <p>Enter your account details below</p>
                </div>
                <Notify />
                <form action="#">
                  <div className="form-group">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="ex: john@email.com"
                      value={authState.email}
                      onChange={(e) =>
                        _handleChange({
                          field: "email",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Password*</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="i.e. IAmthepreciouspass123 "
                      value={authState.password}
                      onChange={(e) =>
                        _handleChange({
                          field: "pass",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="keep-sign-area">
                    <div className="check-form d-inline-block">
                      <label
                        htmlFor="terms-check"
                        className="check-input-control d-flex align-items-center mb-0"
                      >
                        <input
                          className="d-none"
                          type="checkbox"
                          id="terms-check"
                        />
                        <span className="checkbox checkbox-2 rounded-check-box " />
                        <span className="remember-text">Keep me signed in</span>
                      </label>
                    </div>
                  </div>
                  <div className="sign-in-log-btn">
                    <button
                      to="/dashboard"
                      type="button"
                      className="btn focus-reset"
                      onClick={loading ? null : _handleLogin}
                    >
                      {loading ? <Loader /> : " Log In"}
                    </button>
                  </div>
                  <div className="create-new-acc-text">
                    <p>
                      Forgot password? <Link to="">Reset now</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
