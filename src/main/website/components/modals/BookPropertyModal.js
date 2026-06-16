import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { _bookShortStay } from "../../../libs/functions/creates";
import { AuthContext } from "../../../libs/contexts/authContext";
import { formatPriceWithCurrency } from "../../../libs/data/siteSettings";

const normalizeDateValue = (value) => {
  if (!value) return "";
  const normalized = new Date(value);
  if (Number.isNaN(normalized.getTime())) return "";
  return normalized.toISOString().split("T")[0];
};

const formatDateLabel = (value) =>
  new Date(normalizeDateValue(value)).toLocaleDateString();

const addDays = (value, days) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export default function BookPropertyModal({ property, siteSettings, onBooked }) {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkInDate: "",
    nights: "",
    guests: "1",
    paymentMethod: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isShortStay =
    String(property?.rentOrSale || "").trim().toLowerCase() === "short stay";

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      name:
        `${authState?.user?.firstName || ""} ${authState?.user?.lastName || ""}`.trim() ||
        current.name,
      email: authState?.user?.email || current.email,
      phone: authState?.user?.phone || current.phone,
    }));
  }, [authState]);

  const availableDateSet = useMemo(() => {
    const openDates = property?.shortStay?.openDates || [];
    const unavailable = new Set([
      ...(property?.shortStay?.blockedDates || []),
      ...(property?.shortStay?.bookedDates || []),
    ]);

    return new Set(
      openDates
        .map(normalizeDateValue)
        .filter((date) => date && !unavailable.has(date))
    );
  }, [property]);

  const availableCheckInDates = useMemo(
    () => [...availableDateSet].sort(),
    [availableDateSet]
  );

  const durationOptions = useMemo(() => {
    if (!formData.checkInDate || !availableDateSet.has(formData.checkInDate)) {
      return [];
    }

    const options = [];
    const minimumNights = Number(property?.shortStay?.minimumNights || 1);
    let nights = 1;

    while (availableDateSet.has(addDays(formData.checkInDate, nights - 1))) {
      if (nights >= minimumNights) {
        options.push({
          value: String(nights),
          label: `${nights} night${nights > 1 ? "s" : ""}`,
          checkout: addDays(formData.checkInDate, nights),
        });
      }
      nights += 1;
    }

    return options;
  }, [availableDateSet, formData.checkInDate, property]);

  const selectedDuration = durationOptions.find(
    (option) => option.value === String(formData.nights)
  );

  const totalAmount = selectedDuration
    ? Number(property?.price || 0) * Number(selectedDuration.value)
    : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "checkInDate" ? { nights: "" } : {}),
    }));
  };

  const resetForm = () => {
    setSuccess(false);
    setError("");
    setFormData((current) => ({
      ...current,
      checkInDate: "",
      nights: "",
      guests: "1",
      paymentMethod: "",
      message: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authState?.user?._id) {
      setError("Please log in first before booking a short stay.");
      history.push("/login");
      return;
    }

    if (!selectedDuration) {
      setError("Choose a valid stay duration from the available dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await _bookShortStay({
        propertyId: property?._id,
        userID: authState.user._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        checkInDate: formData.checkInDate,
        checkOutDate: selectedDuration.checkout,
        guests: formData.guests,
        paymentMethod: formData.paymentMethod,
        message: formData.message,
      });

      if (!results || results.success === 0) {
        throw new Error(results?.message || "Failed to book short stay.");
      }

      setSuccess(true);
      if (onBooked && results?.data?.bookedDates) {
        onBooked(results.data.bookedDates);
      }
    } catch (err) {
      setError(err.message || "Failed to book property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isShortStay) {
    return null;
  }

  return (
    <div
      className="modal fade"
      id="bookPropertyModal"
      tabIndex="-1"
      aria-labelledby="bookPropertyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title" id="bookPropertyModalLabel">
              <i className="fa fa-home me-2"></i> Reserve Short Stay
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetForm}
            ></button>
          </div>
          <div className="modal-body p-4">
            {success ? (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i className="fa fa-check-circle text-success" style={{ fontSize: "3rem" }}></i>
                </div>
                <h4 className="mb-3">Short Stay Reserved!</h4>
                <p className="mb-2">
                  Your booking for {property?.name} has been created successfully.
                </p>
                {selectedDuration ? (
                  <p className="mb-4">
                    {formatDateLabel(formData.checkInDate)} to{" "}
                    {formatDateLabel(selectedDuration.checkout)} for{" "}
                    {selectedDuration.value} night(s).
                  </p>
                ) : null}
                <button className="btn btn-warning" data-bs-dismiss="modal" onClick={resetForm}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : null}

                <div className="card p-3 mb-3 bg-light">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">{property?.name}</h6>
                      <small className="text-muted">
                        Check-in {property?.shortStay?.checkInTime || "14:00"} · Check-out{" "}
                        {property?.shortStay?.checkOutTime || "11:00"}
                      </small>
                    </div>
                    <strong>
                      {formatPriceWithCurrency(property?.price, property?.currency, siteSettings)}
                      /night
                    </strong>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="bookingName" className="form-label">
                    Your Name
                  </label>
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
                    <label htmlFor="bookingEmail" className="form-label">
                      Email Address
                    </label>
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
                    <label htmlFor="bookingPhone" className="form-label">
                      Phone Number
                    </label>
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
                    <label htmlFor="checkInDate" className="form-label">
                      Check-in Date
                    </label>
                    <select
                      className="form-select"
                      id="checkInDate"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select available date</option>
                      {availableCheckInDates.map((date) => (
                        <option key={date} value={date}>
                          {formatDateLabel(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nights" className="form-label">
                      Stay Duration
                    </label>
                    <select
                      className="form-select"
                      id="nights"
                      name="nights"
                      value={formData.nights}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select nights</option>
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="guests" className="form-label">
                      Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="paymentMethod" className="form-label">
                      Preferred Payment Method
                    </label>
                    <select
                      className="form-select"
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select payment method</option>
                      <option value="Card">Card</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>

                {selectedDuration ? (
                  <div className="alert alert-info" role="alert">
                    Checkout: {formatDateLabel(selectedDuration.checkout)}
                    <br />
                    Total:{" "}
                    {formatPriceWithCurrency(totalAmount, property?.currency, siteSettings)}
                  </div>
                ) : null}

                <div className="mb-3">
                  <label htmlFor="bookingMessage" className="form-label">
                    Additional Information
                  </label>
                  <textarea
                    className="form-control"
                    id="bookingMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Arrival notes, guest information, or any special requests..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <small className="text-muted">
                    Closed and booked dates are automatically excluded from the available options.
                  </small>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      "Reserve Short Stay"
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
