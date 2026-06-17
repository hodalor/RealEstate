import React, { useState, useEffect, useContext } from 'react';
import { AgentsContext } from '../../../../libs/contexts/agentsContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import Loader from '../../../../components/loader';
import { toast } from 'react-toastify';
import { formatPriceWithCurrency } from '../../../../libs/data/siteSettings';

export default function PaymentHistory() {
  const { loading } = useContext(AuthContext);
  const { agentState } = useContext(AgentsContext);
  
  // State for payments
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setPayments([]);
        setFilteredPayments([]);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to load payment history. Please try again later.');
        toast.error('Failed to load payment history');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPayments();
  }, [agentState.agent]);
  
  // Filter payments when filter status, search term, or date range changes
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
        payment.propertyName.toLowerCase().includes(term) ||
        payment.clientName.toLowerCase().includes(term) ||
        payment.clientEmail.toLowerCase().includes(term) ||
        payment.transactionId.toLowerCase().includes(term) ||
        payment.paymentType.toLowerCase().includes(term)
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
  }, [payments, filterStatus, searchTerm, dateRange]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (amount, currency) => {
    return formatPriceWithCurrency(amount, currency);
  };
  
  // Handle date range change
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };
  
  // Clear filters
  const clearFilters = () => {
    setFilterStatus('all');
    setSearchTerm('');
    setDateRange({ from: '', to: '' });
  };

  const totalCompleted = payments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Payment</strong> History</h2>
          </div>
          <div className="body">
            <div className="row mb-4">
              <div className="col-lg-4 col-md-6">
                <div className="card bg-success text-white">
                  <div className="body">
                    <h4 className="mt-0 mb-0">{formatCurrency(totalCompleted, "GHC")}</h4>
                    <p className="mb-0">Completed Payments</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card bg-warning text-white">
                  <div className="body">
                    <h4 className="mt-0 mb-0">{formatCurrency(totalPending, "GHC")}</h4>
                    <p className="mb-0">Pending Payments</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card bg-primary text-white">
                  <div className="body">
                    <h4 className="mt-0 mb-0">{agentState.properties?.length || 0}</h4>
                    <p className="mb-0">Properties Under Account</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Filters */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by property, client, or transaction"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label>From Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="from"
                        value={dateRange.from}
                        onChange={handleDateRangeChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label>To Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="to"
                        value={dateRange.to}
                        onChange={handleDateRangeChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button 
                      className="btn btn-outline-secondary btn-block"
                      onClick={clearFilters}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    className="form-control" 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payments Table */}
            {loading || isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : filteredPayments.length === 0 ? (
              <div className="alert alert-info">No payment records found</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover m-b-0">
                  <thead className="thead-dark">
                    <tr>
                      <th>Transaction ID</th>
                      <th>Property</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Payment Type</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <small>{payment.transactionId}</small>
                        </td>
                        <td>
                          <h6 className="mb-0">{payment.propertyName}</h6>
                          <small className="text-muted">ID: {payment.propertyId}</small>
                        </td>
                        <td>
                          <div>{payment.clientName}</div>
                          <small>{payment.clientEmail}</small>
                        </td>
                        <td>
                          <strong>{formatCurrency(payment.amount, payment.currency)}</strong>
                        </td>
                        <td>{payment.paymentType}</td>
                        <td>{formatDate(payment.paymentDate)}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>
                          <span className={`badge ${payment.status === 'pending' ? 'badge-warning' : 
                            payment.status === 'completed' ? 'badge-success' : 
                            payment.status === 'failed' ? 'badge-danger' : 
                            'badge-info'}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
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
