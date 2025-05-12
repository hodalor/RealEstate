import React, { useState, useEffect, useContext } from 'react';
import { AgentsContext } from '../../../../libs/contexts/agentsContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import Loader from '../../../../components/loader';
import { toast } from 'react-toastify';

export default function TourBookings() {
  const { loading } = useContext(AuthContext);
  const { agentState } = useContext(AgentsContext);
  
  // State for tour bookings
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch tour bookings data
  useEffect(() => {
    const fetchTourBookings = async () => {
      try {
        setIsLoading(true);
        // This would be replaced with an actual API call
        // const response = await fetch(`${agentUrl}tour-bookings/${agentState.agent._id}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = [
          {
            id: '1',
            propertyId: 'prop123',
            propertyName: 'Luxury Apartment in East Legon',
            clientName: 'John Doe',
            clientEmail: 'john.doe@example.com',
            clientPhone: '+233 123 456 789',
            requestDate: new Date().toISOString(),
            tourDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            tourTime: '10:00 AM',
            status: 'pending',
            notes: 'Client is interested in similar properties in the area as well.'
          },
          {
            id: '2',
            propertyId: 'prop456',
            propertyName: 'Family House in Tema',
            clientName: 'Jane Smith',
            clientEmail: 'jane.smith@example.com',
            clientPhone: '+233 987 654 321',
            requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tourDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            tourTime: '2:30 PM',
            status: 'confirmed',
            notes: 'Client is looking for a family home with at least 4 bedrooms.'
          },
          {
            id: '3',
            propertyId: 'prop789',
            propertyName: 'Office Space in Airport Residential',
            clientName: 'Robert Johnson',
            clientEmail: 'robert.johnson@example.com',
            clientPhone: '+233 456 789 123',
            requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tourDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tourTime: '11:00 AM',
            status: 'completed',
            notes: 'Client is looking for office space for a tech startup with 15 employees.'
          },
          {
            id: '4',
            propertyId: 'prop101',
            propertyName: 'Beachfront Villa in Labadi',
            clientName: 'Emma Thompson',
            clientEmail: 'emma.thompson@example.com',
            clientPhone: '+233 234 567 890',
            requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            tourDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            tourTime: '4:00 PM',
            status: 'pending',
            notes: 'Client is interested in beachfront properties only.'
          }
        ];
        
        setBookings(mockData);
        setFilteredBookings(mockData);
      } catch (error) {
        console.error('Error fetching tour bookings:', error);
        setError('Failed to load tour bookings. Please try again later.');
        toast.error('Failed to load tour bookings');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTourBookings();
  }, []);
  
  // Filter bookings when filter status or search term changes
  useEffect(() => {
    let result = [...bookings];
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(booking => booking.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.propertyName.toLowerCase().includes(term) ||
        booking.clientName.toLowerCase().includes(term) ||
        booking.clientEmail.toLowerCase().includes(term) ||
        booking.clientPhone.includes(term)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, filterStatus, searchTerm]);
  
  // Handle status change
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${agentUrl}tour-bookings/${bookingId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });
      // const data = await response.json();
      
      // Update local state
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      
      setBookings(updatedBookings);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Tour</strong> Bookings</h2>
          </div>
          <div className="body">
            {/* Filters */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by property, client name or contact"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="btn-group">
                  <button 
                    type="button" 
                    className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    All
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus('pending')}
                  >
                    Pending
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filterStatus === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus('confirmed')}
                  >
                    Confirmed
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filterStatus === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${filterStatus === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus('cancelled')}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bookings Table */}
            {loading || isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : filteredBookings.length === 0 ? (
              <div className="alert alert-info">No tour bookings found</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover m-b-0">
                  <thead className="thead-dark">
                    <tr>
                      <th>Property</th>
                      <th>Client</th>
                      <th>Contact</th>
                      <th>Tour Date & Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <h6 className="mb-0">{booking.propertyName}</h6>
                          <small className="text-muted">ID: {booking.propertyId}</small>
                        </td>
                        <td>{booking.clientName}</td>
                        <td>
                          <div>{booking.clientEmail}</div>
                          <small>{booking.clientPhone}</small>
                        </td>
                        <td>
                          <div>{formatDate(booking.tourDate)}</div>
                          <small>{booking.tourTime}</small>
                        </td>
                        <td>
                          <span className={`badge ${booking.status === 'pending' ? 'badge-warning' : 
                            booking.status === 'confirmed' ? 'badge-primary' : 
                            booking.status === 'completed' ? 'badge-success' : 
                            'badge-danger'}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button 
                              className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                              type="button" 
                              id={`dropdownMenuButton-${booking.id}`} 
                              data-toggle="dropdown" 
                              aria-haspopup="true" 
                              aria-expanded="false"
                            >
                              Actions
                            </button>
                            <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${booking.id}`}>
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                disabled={booking.status === 'confirmed' || booking.status === 'completed' || booking.status === 'cancelled'}
                              >
                                <i className="fa fa-check text-success mr-2"></i> Confirm
                              </button>
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                                disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                              >
                                <i className="fa fa-check-circle text-primary mr-2"></i> Mark as Completed
                              </button>
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                              >
                                <i className="fa fa-times text-danger mr-2"></i> Cancel
                              </button>
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item">
                                <i className="fa fa-envelope mr-2"></i> Contact Client
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}