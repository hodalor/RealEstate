import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './HomePage';

export default function NewLandingPage() {
  return (
    <div className="site-wrapper">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}