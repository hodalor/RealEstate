import React from "react";
import Header from "./components/Header";
import AdvancedFilters from "./components/AdvancedFilters";
import { _fetchProperties } from '../libs/functions/fetches';
import PropertyListing from './components/PropertyListing';
import { useState, useEffect } from "react";
export default function PublicProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchApprovedProperties();
  }, []); // Empty dependency array ensures this only runs once on mount
  const fetchApprovedProperties = async () => {
    
    setLoading(true);
    try {
      const results = await _fetchProperties();
      if (results && results.success !== 0) {
        // Filter only approved properties
        const approvedProperties = results.data.filter(property => property.isApproved);
        
        // Sort by creation date (newest first)
        const sortedProperties = approvedProperties.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Apply limit if specified
        // const limitedProperties = limit > 0 ? sortedProperties.slice(0, limit) : sortedProperties;
        setProperties(sortedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
    setLoading(false);
  };
  return (
    <div>
      <Header />
      {/* <AdvancedFilters /> */}
      <section className="all-properties py-5 bg-light">
        <div className="container">
          <h2 className="section-title mb-4">All Properties</h2>
          
          <PropertyListing properties={properties} loading={loading}/>
        </div>
      </section>
    </div>
  );
}
