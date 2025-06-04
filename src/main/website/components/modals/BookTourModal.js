import React, { useState } from 'react';
import { _bookTour } from '../../libs/functions/creates';

export default function BookTourModal({ property }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      // Prepare tour booking data
      const tourBookingData = {
        userName: formData.name,
        email: formData.email,
        phone: formData.phone,
        tourDate: formData.date,
        tourTime: formData.time,
        note: formData.message || '',
        propertyId: property?._id,
        agentid: property?.agentID || property?.agentId // Handle different property structures
      };

      // Send tour booking request to backend
      const result = await _bookTour(tourBookingData);

      if (result && result.success !== 0) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          message: ''
        });
      } else {
        setError(result?.message || 'Failed to book tour. Please try again.');
      }
    } catch (err) {
      console.error('Error booking tour:', err);
      setError('Failed to book tour. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError('');
  };

  return (
    <div className="modal fade" id="bookTourModal" tabIndex="-1" aria-labelledby="bookTourModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="bookTourModalLabel">
              <i className="fa fa-calendar me-2"></i> Book a Tour
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm}></button>
          </div>
          <div className="modal-body p-4">
            {success ? (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i className="fa fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="mb-3">Tour Booked Successfully!</h4>
                <p className="mb-4">We've received your tour request for {property?.name}. Our agent will contact you shortly to confirm the details.</p>
                <button className="btn btn-primary" data-bs-dismiss="modal">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="tourName" className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="tourName" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tourEmail" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="tourEmail" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tourPhone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="tourPhone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tourDate" className="form-label">Preferred Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="tourDate" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tourTime" className="form-label">Preferred Time</label>
                    <input 
                      type="time" 
                      className="form-control" 
                      id="tourTime" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="tourMessage" className="form-label">Additional Information</label>
                  <textarea 
                    className="form-control" 
                    id="tourMessage" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      'Book Tour'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}