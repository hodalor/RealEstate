import { useEffect, useMemo, useState } from "react";

const normalizeDateValue = (value) => {
  if (!value) return "";
  const normalized = new Date(value);
  if (Number.isNaN(normalized.getTime())) return "";
  return normalized.toISOString().split("T")[0];
};

const sortDates = (dates = []) =>
  [...new Set((dates || []).map(normalizeDateValue).filter(Boolean))].sort();

const formatDateLabel = (value) => {
  const normalized = normalizeDateValue(value);
  if (!normalized) return value;
  return new Date(normalized).toLocaleDateString();
};

export default function AvailabilityManager({ property, onSave, loading = false }) {
  const isShortStay =
    String(property?.rentOrSale || "").trim().toLowerCase() === "short stay";
  const [selectedDate, setSelectedDate] = useState("");
  const [draft, setDraft] = useState({
    enabled: true,
    minimumNights: 1,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    openDates: [],
    blockedDates: [],
    bookedDates: [],
  });

  useEffect(() => {
    setDraft({
      enabled: !!property?.shortStay?.enabled,
      minimumNights: Number(property?.shortStay?.minimumNights || 1),
      checkInTime: property?.shortStay?.checkInTime || "14:00",
      checkOutTime: property?.shortStay?.checkOutTime || "11:00",
      openDates: sortDates(property?.shortStay?.openDates),
      blockedDates: sortDates(property?.shortStay?.blockedDates),
      bookedDates: sortDates(property?.shortStay?.bookedDates),
    });
  }, [property]);

  const bookedDateSet = useMemo(
    () => new Set(sortDates(draft.bookedDates)),
    [draft.bookedDates]
  );

  if (!isShortStay) {
    return null;
  }

  const addOpenDate = () => {
    const nextDate = normalizeDateValue(selectedDate);
    if (!nextDate || bookedDateSet.has(nextDate)) {
      return;
    }

    setDraft((current) => ({
      ...current,
      openDates: sortDates([...current.openDates, nextDate]),
      blockedDates: sortDates(current.blockedDates.filter((date) => date !== nextDate)),
    }));
    setSelectedDate("");
  };

  const blockDate = () => {
    const nextDate = normalizeDateValue(selectedDate);
    if (!nextDate || bookedDateSet.has(nextDate)) {
      return;
    }

    setDraft((current) => ({
      ...current,
      openDates: sortDates([...current.openDates, nextDate]),
      blockedDates: sortDates([...current.blockedDates, nextDate]),
    }));
    setSelectedDate("");
  };

  const reopenDate = () => {
    const nextDate = normalizeDateValue(selectedDate);
    if (!nextDate || bookedDateSet.has(nextDate)) {
      return;
    }

    setDraft((current) => ({
      ...current,
      openDates: sortDates([...current.openDates, nextDate]),
      blockedDates: sortDates(current.blockedDates.filter((date) => date !== nextDate)),
    }));
    setSelectedDate("");
  };

  const removeOpenDate = (date) => {
    if (bookedDateSet.has(date)) {
      return;
    }

    setDraft((current) => ({
      ...current,
      openDates: sortDates(current.openDates.filter((item) => item !== date)),
      blockedDates: sortDates(current.blockedDates.filter((item) => item !== date)),
    }));
  };

  return (
    <div className="card">
      <div className="header">
        <h2>
          <strong>Short Stay</strong> Availability
        </h2>
      </div>
      <div className="body">
        <div className="row clearfix">
          <div className="col-md-4">
            <div className="form-group">
              <label>Minimum Nights</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={draft.minimumNights}
                onChange={(e) =>
                  setDraft((current) => ({
                    ...current,
                    minimumNights: Number(e.target.value) || 1,
                  }))
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Check-in Time</label>
              <input
                type="time"
                className="form-control"
                value={draft.checkInTime}
                onChange={(e) =>
                  setDraft((current) => ({
                    ...current,
                    checkInTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Check-out Time</label>
              <input
                type="time"
                className="form-control"
                value={draft.checkOutTime}
                onChange={(e) =>
                  setDraft((current) => ({
                    ...current,
                    checkOutTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-md-4">
            <div className="form-group">
              <label>Manage Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex flex-wrap align-items-end" style={{ gap: "0.5rem", marginTop: "1.8rem" }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={addOpenDate}>
                Open Date
              </button>
              <button type="button" className="btn btn-warning btn-sm" onClick={blockDate}>
                Close Date
              </button>
              <button type="button" className="btn btn-success btn-sm" onClick={reopenDate}>
                Reopen Date
              </button>
              <button
                type="button"
                className="btn btn-info btn-sm"
                onClick={() => onSave(draft)}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Availability"}
              </button>
            </div>
          </div>
        </div>

        <div className="row clearfix m-t-20">
          <div className="col-md-4">
            <h6>Open Dates</h6>
            <div className="d-flex flex-wrap" style={{ gap: "0.4rem" }}>
              {draft.openDates.length > 0 ? (
                draft.openDates.slice(0, 40).map((date) => (
                  <button
                    type="button"
                    key={date}
                    className="badge badge-light"
                    onClick={() => removeOpenDate(date)}
                    disabled={bookedDateSet.has(date)}
                    style={{ border: "1px solid #dbe2ea" }}
                  >
                    {formatDateLabel(date)}
                  </button>
                ))
              ) : (
                <small className="text-muted">No open dates yet</small>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <h6>Closed Dates</h6>
            <div className="d-flex flex-wrap" style={{ gap: "0.4rem" }}>
              {draft.blockedDates.length > 0 ? (
                draft.blockedDates.slice(0, 40).map((date) => (
                  <span key={date} className="badge badge-warning">
                    {formatDateLabel(date)}
                  </span>
                ))
              ) : (
                <small className="text-muted">No closed dates</small>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <h6>Booked Dates</h6>
            <div className="d-flex flex-wrap" style={{ gap: "0.4rem" }}>
              {draft.bookedDates.length > 0 ? (
                draft.bookedDates.slice(0, 40).map((date) => (
                  <span key={date} className="badge badge-danger">
                    {formatDateLabel(date)}
                  </span>
                ))
              ) : (
                <small className="text-muted">No booked dates yet</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
