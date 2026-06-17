import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../../../libs/contexts/adminContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import Loader from '../../../../components/loader';
import { toast } from 'react-toastify';
import { formatPriceWithCurrency } from '../../../../libs/data/siteSettings';

export default function PaymentHistory() {
  const { loading } = useContext(AuthContext);
  useContext(AdminContext);
  
  // State for payments
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  // Mock data for demonstration - would be replaced with actual API calls
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setPayments([]);
        setFilteredPayments([]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to load payment history. Please try again later.');
        setIsLoading(false);
        toast.error('Failed to load payment history');
      }
    };
    
    fetchPayments();
  }, []);
  
  // Filter payments based on status, search term, and date range
  useEffect(() => {
    let result = [...payments];
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(payment => payment.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(payment => 
        payment.clientName.toLowerCase().includes(term) ||
        payment.propertyName.toLowerCase().includes(term) ||
        payment.clientEmail.toLowerCase().includes(term) ||
        payment.transactionId.toLowerCase().includes(term) ||
        payment.id.toLowerCase().includes(term)
      );
    }
    
    // Filter by date range
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      result = result.filter(payment => new Date(payment.paymentDate) >= fromDate);
    }
    
    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999); // End of the day
      result = result.filter(payment => new Date(payment.paymentDate) <= toDate);
    }
    
    setFilteredPayments(result);
  }, [filterStatus, searchTerm, dateRange, payments]);
  
  // Handle date range change
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (amount, currency) => {
    return formatPriceWithCurrency(amount, currency);
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-danger';
      case 'refunded':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  };

  const actionMenuButtonClass =
    "dropdown-item btn btn-link text-left w-100 text-decoration-none";

  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Payment</strong> History</h2>
          </div>
          <div className="body">
            {loading || isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="row mb-4">
                  <div className="col-lg-3 col-md-6">
                    <div className="card bg-success text-white">
                      <div className="body">
                        <h4 className="mt-0 mb-0">
                          {formatCurrency(
                            payments
                              .filter(p => p.status === 'completed')
                              .reduce((sum, p) => sum + p.amount, 0),
                            'GHC'
                          )}
                        </h4>
                        <p className="mb-0">Total Completed Payments</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card bg-warning text-white">
                      <div className="body">
                        <h4 className="mt-0 mb-0">
                          {formatCurrency(
                            payments
                              .filter(p => p.status === 'pending')
                              .reduce((sum, p) => sum + p.amount, 0),
                            'GHC'
                          )}
                        </h4>
                        <p className="mb-0">Pending Payments</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card bg-info text-white">
                      <div className="body">
                        <h4 className="mt-0 mb-0">
                          {formatCurrency(
                            payments
                              .filter(p => p.status === 'refunded')
                              .reduce((sum, p) => sum + p.amount, 0),
                            'GHC'
                          )}
                        </h4>
                        <p className="mb-0">Refunded Payments</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card bg-primary text-white">
                      <div className="body">
                        <h4 className="mt-0 mb-0">{payments.length}</h4>
                        <p className="mb-0">Total Transactions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                      </div>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by client, property, or transaction ID" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-daterange input-group" data-provide="datepicker">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                      </div>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="from" 
                        placeholder="From Date" 
                        value={dateRange.from}
                        onChange={handleDateRangeChange}
                      />
                      <div className="input-group-prepend input-group-append">
                        <span className="input-group-text">to</span>
                      </div>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="to" 
                        placeholder="To Date" 
                        value={dateRange.to}
                        onChange={handleDateRangeChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                        className={`btn ${filterStatus === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilterStatus('completed')}
                      >
                        Completed
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
                        className={`btn ${filterStatus === 'failed' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilterStatus('failed')}
                      >
                        Failed
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${filterStatus === 'refunded' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilterStatus('refunded')}
                      >
                        Refunded
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Payments Table */}
                <div className="table-responsive">
                  <table className="table table-hover m-b-0">
                    <thead className="thead-dark">
                      <tr>
                        <th>Payment ID</th>
                        <th>Property</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">No payments found</td>
                        </tr>
                      ) : (
                        filteredPayments.map(payment => (
                          <tr key={payment.id}>
                            <td>
                              <span className="text-primary">{payment.id}</span><br />
                              <small className="text-muted">{payment.transactionId}</small>
                            </td>
                            <td>
                              <h6>{payment.propertyName}</h6>
                              <small className="text-muted">ID: {payment.propertyId}</small>
                            </td>
                            <td>
                              <h6>{payment.clientName}</h6>
                              <small>{payment.clientEmail}</small>
                            </td>
                            <td>
                              <h6 className="font-weight-bold">{formatCurrency(payment.amount, payment.currency)}</h6>
                            </td>
                            <td>
                              {formatDate(payment.paymentDate)}
                            </td>
                            <td>
                              {payment.paymentMethod}
                            </td>
                            <td>
                              {payment.paymentType}
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(payment.status)}`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Actions
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <button type="button" className={actionMenuButtonClass} onClick={() => toast.info(`Viewing payment ${payment.id}`)}>View Details</button>
                                  <button type="button" className={actionMenuButtonClass} onClick={() => toast.info(`Receipt sent to ${payment.clientEmail}`)}>Send Receipt</button>
                                  {payment.status === 'pending' && (
                                    <>
                                      <button type="button" className={actionMenuButtonClass} onClick={() => toast.success(`Payment ${payment.id} marked as completed`)}>Mark as Completed</button>
                                      <button type="button" className={`${actionMenuButtonClass} text-danger`} onClick={() => toast.warn(`Payment ${payment.id} marked as failed`)}>Mark as Failed</button>
                                    </>
                                  )}
                                  {payment.status === 'completed' && (
                                    <button type="button" className={`${actionMenuButtonClass} text-warning`} onClick={() => toast.info(`Refund flow opened for payment ${payment.id}`)}>Process Refund</button>
                                  )}
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
