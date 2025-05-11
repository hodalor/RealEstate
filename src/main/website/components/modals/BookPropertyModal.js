import React, { useState } from 'react';

export default function BookPropertyModal({ property }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    duration: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    mobileNumber: '',
    mobileProvider: '',
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
      // Here you would typically send the data to your backend API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Property booking submitted:', {
        property: property?._id,
        propertyName: property?.name,
        propertyType: property?.rentOrSale,
        paymentMethod: formData.paymentMethod,
        paymentDetails: formData.paymentMethod === 'card' ? {
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvv: formData.cardCvv
        } : formData.paymentMethod === 'mobile' ? {
          mobileNumber: formData.mobileNumber,
          mobileProvider: formData.mobileProvider
        } : {},
        ...formData
      });
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        moveInDate: '',
        duration: '',
        paymentMethod: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        mobileNumber: '',
        mobileProvider: '',
        message: ''
      });
    } catch (err) {
      console.error('Error booking property:', err);
      setError('Failed to book property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError('');
  };

  return (
    <div className="modal fade" id="bookPropertyModal" tabIndex="-1" aria-labelledby="bookPropertyModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title" id="bookPropertyModalLabel">
              <i className="fa fa-home me-2"></i> Book This Property
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm}></button>
          </div>
          <div className="modal-body p-4">
            {success ? (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i className="fa fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="mb-3">Property Booked Successfully!</h4>
                <p className="mb-4">We've received your booking request for {property?.name}. Our agent will contact you shortly to discuss the next steps.</p>
                <button className="btn btn-warning" data-bs-dismiss="modal">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="bookingName" className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="bookingName" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="bookingEmail" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="bookingEmail" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="bookingPhone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="bookingPhone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="moveInDate" className="form-label">
                      {property?.rentOrSale === 'Rent' ? 'Move-in Date' : 'Preferred Closing Date'}
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="moveInDate" 
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="duration" className="form-label">
                      {property?.rentOrSale === 'Rent' ? 'Rental Duration' : 'Financing Method'}
                    </label>
                    <select
                      className="form-select"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an option</option>
                      {property?.rentOrSale === 'Rent' ? (
                        <>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                          <option value="2 years">2 years</option>
                          <option value="Other">Other (specify in message)</option>
                        </>
                      ) : (
                        <>
                          <option value="Cash">Cash</option>
                          <option value="Mortgage">Mortgage</option>
                          <option value="Bank Loan">Bank Loan</option>
                          <option value="Installment">Installment</option>
                          <option value="Other">Other (specify in message)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card Payment</option>
                    <option value="mobile">Mobile Money</option>
                  </select>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="card p-3 mb-3 bg-light">
                    <h6 className="mb-3">Card Details</h6>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardExpiry" className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardCvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardCvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="XXX"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'mobile' && (
                  <div className="card p-3 mb-3 bg-light">
                    <h6 className="mb-3">Mobile Money Details</h6>
                    <div className="mb-3">
                      <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter mobile money number"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileProvider" className="form-label">Provider</label>
                      <select
                        className="form-select"
                        id="mobileProvider"
                        name="mobileProvider"
                        value={formData.mobileProvider}
                        onChange={handleChange}
                      >
                        <option value="">Select provider</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airtel">AirtelTigo Money</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="bookingMessage" className="form-label">Additional Information</label>
                  <textarea 
                    className="form-control" 
                    id="bookingMessage" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder={property?.rentOrSale === 'Rent' ? 'Any specific requirements or questions about the rental...' : 'Any specific requirements or questions about the purchase...'}
                  ></textarea>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-warning" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `Book ${property?.rentOrSale === 'Rent' ? 'Rental' : 'Purchase'}`
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