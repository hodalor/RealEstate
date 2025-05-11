import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="mb-4">About Us</h5>
              <p>We are dedicated to providing the best real estate services to help you find your dream property.</p>
              <div className="social-icons mt-4">
                <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-white">Home</Link></li>
                <li className="mb-2"><Link to="/properties" className="text-white">Properties</Link></li>
                <li className="mb-2"><Link to="/agents" className="text-white">Agents</Link></li>
                <li className="mb-2"><Link to="/support" className="text-white">Support</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="mb-4">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fa fa-map-marker-alt me-2"></i> 123 Real Estate St, Accra</li>
                <li className="mb-2"><i className="fa fa-phone me-2"></i> +233 123 456 789</li>
                <li className="mb-2"><i className="fa fa-envelope me-2"></i> info@realestate.com</li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4">Newsletter</h5>
              <p>Subscribe to our newsletter for the latest property updates.</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your Email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright */}
      <div className="copyright bg-dark text-white-50 py-3 border-top border-secondary">
        <div className="container text-center">
          <small>© {new Date().getFullYear()} Real Estate. All Rights Reserved.</small>
        </div>
      </div>
    </>
  );
}