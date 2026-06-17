import React from "react";
import { Link } from "react-router-dom";
import useSiteSettings from "../../libs/hooks/useSiteSettings";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Property Listing", to: "/property-listing" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const socialLinks = [
  { label: "Facebook", icon: "fab fa-facebook-f", href: "https://facebook.com/" },
  { label: "Instagram", icon: "fab fa-instagram", href: "https://instagram.com/" },
  { label: "X", icon: "fab fa-twitter", href: "https://x.com/" },
  { label: "LinkedIn", icon: "fab fa-linkedin-in", href: "https://linkedin.com/" },
];

export default function Footer() {
  const { siteSettings } = useSiteSettings();
  const siteName = siteSettings.general.siteName || "LEDS PROPERTIES";
  const footerSettings = siteSettings.content.footer || {};
  const contactAddress = footerSettings.contactAddress || footerSettings.address || "";
  const contactPhone = footerSettings.contactPhone || footerSettings.phone || "";
  const contactEmail = footerSettings.contactEmail || footerSettings.email || "";
  const footerSocialLinks = footerSettings.socialLinks || {};
  const socialItems = socialLinks.map((social) => ({
    ...social,
    href: footerSocialLinks[social.label.toLowerCase()] || social.href,
  }));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-panel">
          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <div className="footer-brand">
                <span className="brand-badge">
                  <i className="fa fa-building" aria-hidden="true"></i>
                </span>
                <div>
                  <h5>{siteName}</h5>
                  <p>{footerSettings.aboutText}</p>
                </div>
              </div>

              <div className="footer-socials">
                {socialItems.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <h6 className="footer-title">Explore</h6>
              <ul className="footer-links">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 col-md-4">
              <h6 className="footer-title">Contact</h6>
              <ul className="footer-links footer-contact">
                <li>
                  <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                  <span>{contactAddress}</span>
                </li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <a href={`tel:${contactPhone}`}>{contactPhone}</a>
                </li>
                <li>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-4">
              <h6 className="footer-title">Stay Updated</h6>
              <p className="footer-copy">
                Get notified when a new approved property matches your search.
              </p>
              <div className="footer-newsletter">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button className="btn btn-primary" type="button">
                  Join List
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <small>
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </small>
            <small>Built for a cleaner property discovery experience.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
