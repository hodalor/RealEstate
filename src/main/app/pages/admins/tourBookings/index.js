import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../../../libs/contexts/adminContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import Loader from '../../../../components/loader';
import { toast } from 'react-toastify';

export default function TourBookings() {
  const { loading } = useContext(AuthContext);
  useContext(AdminContext);
  
  // State for tour bookings
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for demonstration - would be replaced with actual API calls
  useEffect(() => {
    const fetchTourBookings = async () => {
      try {
        setIsLoading(true);
        // This would be replaced with an actual API call
        // const response = await fetch(`${adminUrl}tour-bookings`);
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
            notes: 'Client is interested in similar properties in the area as well.',
            agentAssigned: 'Sarah Johnson'
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
            notes: 'Client is looking for a family home with at least 4 bedrooms.',
            agentAssigned: 'Michael Brown'
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
            notes: 'Client is looking for office space for a tech startup with 15 employees.',
            agentAssigned: 'David Wilson'
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
            notes: 'Client is interested in beachfront properties only.',
            agentAssigned: 'Unassigned'
          },
          {
            id: '5',
            propertyId: 'prop202',
            propertyName: 'Penthouse in Cantonments',
            clientName: 'William Davis',
            clientEmail: 'william.davis@example.com',
            clientPhone: '+233 345 678 901',
            requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tourDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tourTime: '1:00 PM',
            status: 'cancelled',
            notes: 'Client cancelled due to scheduling conflict.',
            agentAssigned: 'Sarah Johnson'
          }
        ];
        
        setBookings(mockData);
        setFilteredBookings(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tour bookings:', error);
        setError('Failed to load tour bookings. Please try again later.');
        setIsLoading(false);
        toast.error('Failed to load tour bookings');
      }
    };
    
    fetchTourBookings();
  }, []);
  
  // Filter bookings based on status and search term
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
        booking.clientName.toLowerCase().includes(term) ||
        booking.propertyName.toLowerCase().includes(term) ||
        booking.clientEmail.toLowerCase().includes(term) ||
        booking.clientPhone.includes(term)
      );
    }
    
    setFilteredBookings(result);
  }, [filterStatus, searchTerm, bookings]);
  
  // Handle status change
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setIsLoading(true);
      
      // This would be replaced with an actual API call
      // const response = await fetch(`${adminUrl}tour-bookings/${bookingId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      // const data = await response.json();
      
      // Update booking status in state
      setBookings(prevBookings => {
        return prevBookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, status: newStatus };
          }
          return booking;
        });
      });
      
      toast.success(`Booking status updated to ${newStatus}`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
      setIsLoading(false);
    }
  };
  
  // Handle agent assignment
  const handleAssignAgent = async (bookingId, agentName) => {
    try {
      setIsLoading(true);
      
      // This would be replaced with an actual API call
      // const response = await fetch(`${adminUrl}tour-bookings/${bookingId}/assign`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ agentName }),
      // });
      // const data = await response.json();
      
      // Update agent assignment in state
      setBookings(prevBookings => {
        return prevBookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, agentAssigned: agentName };
          }
          return booking;
        });
      });
      
      toast.success(`Agent ${agentName} assigned to booking`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error assigning agent:', error);
      toast.error('Failed to assign agent');
      setIsLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const actionMenuButtonClass =
    "dropdown-item btn btn-link text-left w-100 text-decoration-none";
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'confirmed':
        return 'badge-primary';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Tour</strong> Bookings</h2>
          </div>
          <div className="body">
            {loading || isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                {/* Filters and Search */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                      </div>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by client name, property, email or phone" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="btn-group float-right">
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
                <div className="table-responsive">
                  <table className="table table-hover m-b-0">
                    <thead className="thead-dark">
                      <tr>
                        <th>Property</th>
                        <th>Client</th>
                        <th>Tour Date & Time</th>
                        <th>Agent</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">No tour bookings found</td>
                        </tr>
                      ) : (
                        filteredBookings.map(booking => (
                          <tr key={booking.id}>
                            <td>
                              <h6>{booking.propertyName}</h6>
                              <small className="text-muted">ID: {booking.propertyId}</small>
                            </td>
                            <td>
                              <h6>{booking.clientName}</h6>
                              <small>{booking.clientEmail}</small><br />
                              <small>{booking.clientPhone}</small>
                            </td>
                            <td>
                              <h6>{formatDate(booking.tourDate)}</h6>
                              <small>{booking.tourTime}</small>
                            </td>
                            <td>
                              {booking.agentAssigned === 'Unassigned' ? (
                                <div className="dropdown">
                                  <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Assign Agent
                                  </button>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button type="button" className={actionMenuButtonClass} onClick={() => handleAssignAgent(booking.id, 'Sarah Johnson')}>Sarah Johnson</button>
                                    <button type="button" className={actionMenuButtonClass} onClick={() => handleAssignAgent(booking.id, 'Michael Brown')}>Michael Brown</button>
                                    <button type="button" className={actionMenuButtonClass} onClick={() => handleAssignAgent(booking.id, 'David Wilson')}>David Wilson</button>
                                  </div>
                                </div>
                              ) : (
                                <span>{booking.agentAssigned}</span>
                              )}
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Actions
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <button type="button" className={actionMenuButtonClass} onClick={() => handleStatusChange(booking.id, 'confirmed')}>Confirm</button>
                                  <button type="button" className={actionMenuButtonClass} onClick={() => handleStatusChange(booking.id, 'completed')}>Mark as Completed</button>
                                  <button type="button" className={actionMenuButtonClass} onClick={() => handleStatusChange(booking.id, 'cancelled')}>Cancel</button>
                                  <div className="dropdown-divider"></div>
                                  <button type="button" className={actionMenuButtonClass} onClick={() => toast.info(`Viewing booking ${booking.id}`)}>View Details</button>
                                  <button type="button" className={actionMenuButtonClass} onClick={() => toast.info(`Reminder queued for ${booking.clientName}`)}>Send Reminder</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
