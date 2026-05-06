import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { _fetchProperties } from "../libs/functions/fetches";
import PropertyListing from "./components/PropertyListing";

export default function PublicProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      setLoading(true);

      try {
        const results = await _fetchProperties();

        if (results && results.success !== 0) {
          const approvedProperties = results.data
            .filter((property) => property.isApproved)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setProperties(approvedProperties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProperties();
  }, []);

  return (
    <div className="site-wrapper">
      <Header />

      <section className="section-space section-muted listing-page-section">
        <div className="container">
          <PropertyListing properties={properties} loading={loading} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
