import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Notify from "../../components/notification";
import { AuthContext } from "../../libs/contexts/authContext";

export default function Register(props) {
  const { loading, authState, _handleChange, _handleRegister } =
    useContext(AuthContext);

  return (
    <div className="site-wrapper overflow-hidden position-relative">
      {/* Sign In Area */}
      <div className="sign-up-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8 position-static d-none d-lg-block">
              <div className="inner-page-left-bg">
                <img
                  src="../assets/image/landing-7/slider-1.png"
                  alt="slider"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <div className="sign-up-3-box  justify-content-lg-end">
                <div className="heading">
                  <h2>Sign up</h2>
                  <p>No credit card required</p>
                </div>
                <Notify />
                <form>
                  <div className="form-group">
                    <label>First Name*</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="ex: Livia"
                      value={authState.firstName}
                      onChange={(e) =>
                        _handleChange({
                          field: "firstName",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="ex: Siphron"
                      value={authState.lastName}
                      onChange={(e) =>
                        _handleChange({
                          field: "lastName",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone*</label>
                    <input
                      type="phone"
                      name="phone"
                      id="name"
                      className="form-control"
                      placeholder="ex: 0546735894"
                      value={authState.phone}
                      onChange={(e) =>
                        _handleChange({
                          field: "phone",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
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
                  <div className="form-group">
                    <label>Confirm Password*</label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      className="form-control"
                      placeholder="i.e. IAmthepreciouspass123 "
                      value={authState.con_pass}
                      onChange={(e) =>
                        _handleChange({
                          field: "con_pass",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="keep-sign-area">
                    {/* <div className="check-form d-inline-block">
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
                        <span className="remember-text">
                          I agree to the{" "}
                          <Link to="/terms">Terms &amp; Conditions</Link>
                        </span>
                      </label>
                    </div> */}
                  </div>
                  <div className="sign-in-log-btn">
                    <button
                      type="button"
                      className="btn focus-reset"
                      onClick={loading ? null : _handleRegister}
                    >
                      {loading ? <Loader title="auth" /> : " Sign Up"}
                    </button>
                  </div>
                  <div className="create-new-acc-text">
                    <p>
                      Already have an account? <Link to="/login">Sign in</Link>
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
