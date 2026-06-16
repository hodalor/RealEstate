import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Notify from "../../components/notification";
import { AuthContext } from "../../libs/contexts/authContext";

export default function Login() {
  const { _handleLogin, _handleChange, authState, loading } = useContext(AuthContext);

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-shell">
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-6 d-none d-lg-block">
              <div className="auth-visual-panel">
                <span className="eyebrow-pill">Welcome back</span>
                <h1>Sign in to continue your property search.</h1>
                <p>
                  Re-enter your account to revisit listings, manage requests,
                  and continue the buyer or renter journey in a cleaner public
                  experience.
                </p>

                <div className="auth-visual-list">
                  <div>
                    <strong>Save time</strong>
                    <span>Jump straight back into the listings that matter most.</span>
                  </div>
                  <div>
                    <strong>Stay organized</strong>
                    <span>Keep your activity, requests, and follow-ups in one place.</span>
                  </div>
                  <div>
                    <strong>Move faster</strong>
                    <span>Book tours and connect with agents without friction.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="auth-form-panel">
                <div className="auth-form-card">
                  <div className="auth-brand-row">
                    <Link to="/" className="brand-mark text-decoration-none">
                      <span className="brand-badge">
                        <i className="fa fa-building" aria-hidden="true"></i>
                      </span>
                      <span>
                        <strong>BrightEstate</strong>
                        <small>Public portal</small>
                      </span>
                    </Link>
                  </div>

                  <div className="heading">
                    <h2>Sign in</h2>
                    <p>Enter your account details below</p>
                  </div>

                  <Notify />

                  <form className="auth-form" action="#">
                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
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
                            value: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password*</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={authState.password}
                        onChange={(e) =>
                          _handleChange({
                            field: "pass",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="sign-in-log-btn">
                      <button
                        type="button"
                        className="btn focus-reset auth-submit-btn"
                        onClick={loading ? null : _handleLogin}
                      >
                        {loading ? <Loader title="auth" /> : "Sign In"}
                      </button>
                    </div>

                    <div className="create-new-acc-text">
                      <p>
                        Not registered yet? <Link to="/register">Create an account</Link>
                      </p>
                    </div>

                    <div className="auth-footer-links">
                      <Link to="/">Back to home</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
