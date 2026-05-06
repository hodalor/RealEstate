import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Notify from "../../components/notification";
import { AuthContext } from "../../libs/contexts/authContext";

export default function Register() {
  const { loading, authState, _handleChange, _handleRegister } =
    useContext(AuthContext);

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-shell">
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-6 d-none d-lg-block">
              <div className="auth-visual-panel auth-visual-panel-register">
                <span className="eyebrow-pill">Create account</span>
                <h1>Join a brighter property platform.</h1>
                <p>
                  Register to save your place in the journey, organize property
                  activity, and continue smoothly from browsing to booking.
                </p>

                <div className="auth-visual-list">
                  <div>
                    <strong>Better discovery</strong>
                    <span>Search approved listings with clearer filters and faster scanning.</span>
                  </div>
                  <div>
                    <strong>Easy actions</strong>
                    <span>Book tours, reserve homes, and start conversations quickly.</span>
                  </div>
                  <div>
                    <strong>Simple onboarding</strong>
                    <span>Set up an account in minutes with no payment required.</span>
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
                    <h2>Sign up</h2>
                    <p>No credit card required</p>
                  </div>

                  <Notify />

                  <form className="auth-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name*</label>
                          <input
                            type="text"
                            id="firstName"
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
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name*</label>
                          <input
                            type="text"
                            id="lastName"
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
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Phone*</label>
                          <input
                            type="tel"
                            id="phone"
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
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email*</label>
                          <input
                            type="email"
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
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password">Password*</label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Create a secure password"
                            value={authState.password}
                            onChange={(e) =>
                              _handleChange({
                                field: "pass",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password2">Confirm Password*</label>
                          <input
                            type="password"
                            id="password2"
                            className="form-control"
                            placeholder="Re-enter your password"
                            value={authState.con_pass}
                            onChange={(e) =>
                              _handleChange({
                                field: "con_pass",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="auth-terms-note">
                      By creating an account, you agree to the{" "}
                      <Link to="/terms">Terms &amp; Conditions</Link>.
                    </div>

                    <div className="sign-in-log-btn">
                      <button
                        type="button"
                        className="btn focus-reset auth-submit-btn"
                        onClick={loading ? null : _handleRegister}
                      >
                        {loading ? <Loader title="auth" /> : "Create Account"}
                      </button>
                    </div>

                    <div className="create-new-acc-text">
                      <p>
                        Already have an account? <Link to="/login">Sign in</Link>
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
