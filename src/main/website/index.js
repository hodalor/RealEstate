import { Link } from "react-router-dom";

export default function Web(props) {
  return (
    <div className="site-wrapper overflow-hidden position-relative">
      {/*Site Header Area */}
      <header
        className="site-header site-header--menu-right site-header--absolute site-header--sticky"
        style={{ paddingTop: "10px" }}
      >
        <div className="container">
          <nav className="navbar site-navbar">
            {/* Brand Logo*/}
            <div className="brand-logo">
              <a href="#">
                {/* light version logo (logo must be black)*/}
                <img
                  src="../assets/image/logo/logo-black.png"
                  alt
                  className="light-version-logo"
                />
                {/* Dark version logo (logo must be White)*/}
                <img
                  src="../assets/image/logo/logo-white.png"
                  alt
                  className="dark-version-logo"
                />
              </a>
            </div>
            <div
              className="header-btn l7-header-btn ms-auto d-none d-xs-inline-flex"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link
                to="/register"
                className="btn btn btn-style-03"
                type="button"
              >
                Register
              </Link>
              <Link
                to="/login"
                type="button"
                role="button"
                style={{ marginLeft: "5px", color: "grey" }}
              >
                Sign In
              </Link>
            </div>
            {/* mobile menu trigger */}
            <div className="mobile-menu-trigger">
              <span />
            </div>
            {/*/.Mobile Menu Hamburger Ends*/}
          </nav>
        </div>
      </header>
      {/* navbar- */}
      {/* Hero Area */}
      <div
        className="hero-area-l7 background-property"
        style={{ background: "url(../assets/image/landing-7/banner.png)" }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-lg-start justify-content-center">
            <div
              className="col-xxl-5 col-xl-6 col-lg-6 col-md-10 order-lg-1 order-1"
              data-aos="fade-up"
              data-aos-delay={700}
              data-aos-duration={1000}
            >
              <div className="hero-l7-content">
                <h2>Find the perfect place to stay with your family. </h2>
                <p>
                  Family is number one, and comfortable is number two. That two
                  things is must br together. Let’s start it!
                </p>
              </div>
            </div>
            <div
              className="offset-xxl-2 col-xxl-5 col-xl-6 col-lg-6 col-md-10 order-lg-1 order-0"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="hero-l7-slider position-relative">
                <div className="hero-slider-single-item focus-reset">
                  <div className="image overflow-hidden image-hover-style-01">
                    <img
                      className="w-100"
                      src="../assets/image/landing-7/slider-1.png"
                      alt="image"
                    />
                  </div>
                  <div className="content-box d-flex flex-wrap align-items-center justify-content-between">
                    <div className="item">
                      <p>Location</p>
                      <span>Cantoment</span>
                    </div>
                    <div className="item">
                      <p>Type</p>
                      <span>Duplex</span>
                    </div>
                    <div className="item">
                      <p>Price</p>
                      <span>$50,000</span>
                    </div>
                    <div className="item view-property-btn">
                      <a href="#" className="btn focus-reset btn-style-05">
                        View Property
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hero-slider-single-item focus-reset">
                  <div className="image overflow-hidden image-hover-style-01">
                    <img
                      className="w-100"
                      src="../assets/image/landing-7/slider-2.png"
                      alt="image"
                    />
                  </div>
                  <div className="content-box d-flex flex-wrap align-items-center justify-content-between">
                    <div className="item">
                      <p>Location</p>
                      <span>East Legon</span>
                    </div>
                    <div className="item">
                      <p>Type</p>
                      <span>Duplex</span>
                    </div>
                    <div className="item">
                      <p>Price</p>
                      <span>$50,000</span>
                    </div>
                    <div className="item view-property-btn">
                      <a href="#" className="btn focus-reset btn-style-05">
                        View Property
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hero-slider-single-item focus-reset">
                  <div className="image overflow-hidden image-hover-style-01">
                    <img
                      className="w-100"
                      src="../assets/image/landing-7/slider-3.png"
                      alt="image"
                    />
                  </div>
                  <div className="content-box d-flex flex-wrap align-items-center justify-content-between">
                    <div className="item">
                      <p>Location</p>
                      <span>Accr Newtown</span>
                    </div>
                    <div className="item">
                      <p>Type</p>
                      <span>Duplex</span>
                    </div>
                    <div className="item">
                      <p>Price</p>
                      <span>$50,000</span>
                    </div>
                    <div className="item view-property-btn">
                      <a href="#" className="btn focus-reset btn-style-05">
                        View Property
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Area */}
      <div className="feature-area-l7">
        <div className="container">
          <div className="row justify-content-center feature-area-l7-items">
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-right"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="feature-card-l7">
                <div className="icon">
                  <img
                    src="../assets/image/landing-7/feature-icon-1.svg"
                    alt="image"
                  />
                </div>
                <div className="content">
                  <h4>Beautiful Architecture</h4>
                  <p>
                    Duis aute irure dolor in velit esse reprehen derit in
                    voluptate cillum dolore eu fugiat nulla.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="feature-card-l7">
                <div className="icon">
                  <img
                    src="../assets/image/landing-7/feature-icon-1.svg"
                    alt="image"
                  />
                </div>
                <div className="content">
                  <h4>Best Location</h4>
                  <p>
                    Duis aute irure dolor in velit esse reprehen derit in
                    voluptate cillum dolore eu fugiat nulla.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-left"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="feature-card-l7">
                <div className="icon">
                  <img
                    src="../assets/image/landing-7/feature-icon-1.svg"
                    alt="image"
                  />
                </div>
                <div className="content">
                  <h4>Affordable Price</h4>
                  <p>
                    Duis aute irure dolor in velit esse reprehen derit in
                    voluptate cillum dolore eu fugiat nulla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Area 1*/}
      <div className="content-area-l7-1">
        <div className="container">
          <div className="row align-items-center justify-content-lg-start justify-content-center">
            <div
              className="col-xxl-5 col-xl-5 col-lg-6 col-md-10"
              data-aos="fade-up"
              data-aos-delay={700}
              data-aos-duration={1000}
            >
              <div className="content-1-l7-image overflow-hidden image-hover-style-01">
                <img
                  className="w-100"
                  src="../assets/image/landing-7/content-1-image-1.png"
                  alt="image"
                />
              </div>
            </div>
            <div className="offset-xxl-1 col-xxl-5 offset-xl-1 col-xl-5 col-lg-6 col-md-10">
              <div className="content-l7-1-content-box position-relative">
                <div
                  className="section__heading-3"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <h2>Get a perfect house for your family right now.</h2>
                  <p>
                    We know your issue. You’re new couple who want to be simple,
                    including house. So we decided to make it for you! Make your
                    living for live.
                  </p>
                </div>
                <div className="content-1-l7-service">
                  <div
                    className="content-box d-flex flex-wrap align-items-center justify-content-between"
                    data-aos="fade-up"
                    data-aos-delay={500}
                    data-aos-duration={1000}
                  >
                    <div className="item">
                      <p>Budget</p>
                      <span>Confidential</span>
                    </div>
                    <div className="item">
                      <p>Size</p>
                      <span>500m</span>
                    </div>
                    <div className="item">
                      <p>Type</p>
                      <span>House</span>
                    </div>
                  </div>
                  <div
                    className="content-box d-flex flex-wrap align-items-center justify-content-between"
                    data-aos="fade-up"
                    data-aos-delay={500}
                    data-aos-duration={1000}
                  >
                    <div className="item">
                      <p>Status</p>
                      <span>Completed</span>
                    </div>
                    <div className="item">
                      <p>Location</p>
                      <span>Anywhere</span>
                    </div>
                    <div className="item">
                      <p>Bedroom</p>
                      <span>2 Room</span>
                    </div>
                  </div>
                </div>
                <div
                  className="content-1-l7-btn-group"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <a
                    href="#"
                    className="btn focus-reset l7-view-pro-btn btn-style-05"
                  >
                    View Property
                  </a>
                  <a
                    href="#"
                    className="btn focus-reset l7-book-pro-btn btn-style-05"
                  >
                    Book Property
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Area 2*/}
      <div className="content-area-l7-2">
        <div className="container">
          <div className="row content-area-l7-2-heading align-items-center justify-content-lg-start justify-content-center">
            <div className="col-lg-6 col-md-7">
              <div className="section__heading-3">
                <h2>Why you should buy your dream house from us?</h2>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-5">
              <div className="section__heading-3">
                <p>
                  Contory to popular belief, Lorem ipsum is random text, it has
                  roots in a piece
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-lg-start justify-content-center">
            <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-10 order-lg-1 order-1">
              <div className="content-l7-2-content-box">
                <div
                  className="item d-flex flex-wrap "
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="item-icon">
                    <span>1</span>
                  </div>
                  <div className="item-content">
                    <h4>Easy Payment Method</h4>
                    <p>Contray to popular belief, Lorem ipsum</p>
                  </div>
                </div>
                <div
                  className="item d-flex flex-wrap"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="item-icon">
                    <span>2</span>
                  </div>
                  <div className="item-content">
                    <h4>Fixed Fee &amp; Suppo</h4>
                    <p>Contray to popular belief, Lorem ipsum</p>
                  </div>
                </div>
                <div
                  className="item d-flex flex-wrap"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="item-icon">
                    <span>3</span>
                  </div>
                  <div className="item-content">
                    <h4>Tax Advantage</h4>
                    <p>Contray to popular belief, Lorem ipsum</p>
                  </div>
                </div>
                <div
                  className="item d-flex flex-wrap"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="item-icon">
                    <span>4</span>
                  </div>
                  <div className="item-content">
                    <h4>Property Insurance</h4>
                    <p>Contray to popular belief, Lorem ipsum</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="offset-xxl-1 col-xxl-6 col-xl-6 col-lg-6 col-md-10 order-lg-1 order-0"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="content-2-l7-image overflow-hidden image-hover-style-01">
                <img
                  className="w-100"
                  src="../assets/image/landing-7/content-2-image-1.png"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Area*/}
      <div className="testimonial-area-l7">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-xl-5 col-lg-5 col-md-10">
              <div className="testimonial-area-l7-left-side">
                <div
                  className="video-area position-relative"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="image overflow-hidden image-hover-style-01">
                    <img
                      className="w-100"
                      src="../assets/image/landing-7/testimonial-1.png"
                      alt="image"
                    />
                  </div>
                  <div className="video-card d-flex align-items-center justify-content-between">
                    <div className="content">
                      <h6>Gustavo George</h6>
                      <span>West London, Uk</span>
                    </div>
                    <div className="video-icon-area">
                      <a
                        className="video-icon"
                        data-fancybox
                        href="https://www.youtube.com/embed/9yc1lfFZX-I"
                      >
                        <span>
                          <img
                            src="../assets/image/landing-7/video-icon.svg"
                            alt="icon"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="testimonial-content-l7"
                  data-aos="fade-up"
                  data-aos-delay={500}
                  data-aos-duration={1000}
                >
                  <div className="user">
                    <img
                      src="../assets/image/landing-7/testimonial-user.png"
                      alt="image"
                    />
                  </div>
                  <div className="content">
                    <h4>Gustavo George</h4>
                    <p>
                      “Saya tuh kalau pengin beli rumah pasti yagn selalu mahal.
                      Saya tuh gak pengin rumah yang jelek kaya punya kau.
                      Pokoknya saya ganteng.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-7 col-lg-7 col-md-10 position-relative"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="testimonial-area-l7-right-side">
                <div className="row">
                  <div className="offset-xxl-1 col-xxl-7 offset-xl-1 col-xl-8">
                    <div className="section__heading-3">
                      <h2>Testimonials from lovely previous buyers.</h2>
                      <p>
                        Sed ultrices nisl velit, eu ornare est ullamcorper a.
                        Nunc quis nibh magna. Proin risus erat, fringilla vel
                        purus.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="testimonial-right-content-image-l7 overflow-hidden image-hover-style-01">
                      <img
                        className="w-100"
                        src="../assets/image/landing-7/testimonial-2.png"
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Area */}
      {/* Footer Area */}
      <footer className="footer-area-l7  position-relative">
        <div className="container">
          <div className="row justify-content-center justify-content-md-between align-items-center cta-area-l7">
            <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-7">
              <div className="cta-l7-content text-center text-md-start">
                <h2>Get your dream house</h2>
                <p>
                  Family is number one, and comfortable is number two. That two
                  things is must be together. Let’s start it!{" "}
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 col-md-5">
              <div className="cta-l7-btn text-center text-md-end">
                <a href="#" className="btn focus-reset btn-style-05">
                  Request Free Consultation
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="cta-border-l7" />
            </div>
          </div>
          <div className="row justify-content-center footer-l7-area-items">
            <div className="col-xl-4 col-lg-4 col-md-9 col-sm-11">
              <div className="footer-content-l7 text-sm-center text-lg-start">
                <a href="#">
                  <img src="../assets/image/logo/logo-black.png" alt="image" />
                </a>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </div>
            </div>
            <div className="offset-xl-2 col-xl-2 col-lg-3 col-sm-4">
              <h3>Company</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Global location</a>
                </li>
                <li>
                  <a href="#">Missions</a>
                </li>
                <li>
                  <a href="#">Careers </a>
                </li>
                <li>
                  <a href="#">Investors </a>
                </li>
                <li>
                  <a href="#">News rooms </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-4">
              <h3>Impact</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Creator awards</a>
                </li>
                <li>
                  <a href="#">Creative ideas</a>
                </li>
                <li>
                  <a href="#">Refuge initiatives </a>
                </li>
                <li>
                  <a href="#">Residents </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-4">
              <h3>Partnership</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Brookers</a>
                </li>
                <li>
                  <a href="#">Impact coffee</a>
                </li>
                <li>
                  <a href="#">Table talk</a>
                </li>
                <li>
                  <a href="#">Push door </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
