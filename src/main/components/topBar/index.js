import '../../main.css'

export default function TopBar(props) {
  return (
    <div className="">
      {/* Fixed navbar */}
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              href="#sidebar-menu"
              data-toggle="sidebar-menu"
              className="toggle pull-left visible-xs"
            >
              <i className="fa fa-bars" />
            </a>
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#main-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="index.html">
              ThemeKit
            </a>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="main-nav">
            <form className="navbar-form navbar-left margin-none">
              <div className="search-1">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="icon-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-w-150"
                    placeholder="Search .."
                  />
                </div>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              {/* Login */}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-fw fa-lock" /> Login
                </a>
                <div className="dropdown-menu dropdown-size-280">
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-shield" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Login <i className="fa fa-sign-in" />
                      </button>
                    </div>
                  </form>
                </div>
              </li>
              {/* // END login */}
              {/* Sign up */}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-fw fa-plus" /> Sign Up
                </a>
                <div className="dropdown-menu dropdown-size-280">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group form-control-default">
                          <label htmlFor="exampleInputFirstName">
                            First name
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputFirstName"
                            placeholder="Your first name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group form-control-default">
                          <label htmlFor="exampleInputLastName">
                            Last name
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputLastName"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group form-control-default required">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group form-control-default required">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </li>
              {/* // END sign up */}
              {/* user */}
              <li className="dropdown user">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="images/people/110/guy-6.jpg"
                    alt
                    className="img-circle"
                  />{" "}
                  Bill
                  <span className="caret" />
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li>
                    <a href="#">
                      <i className="fa fa-user" />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-wrench" />
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-sign-out" />
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              {/* // END user */}
            </ul>
          </div>
          {/* /.navbar-collapse */}
        </div>
      </div>
    </div>
  );
}
