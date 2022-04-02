import { useContext } from "react";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";

export default function NotiDetails() {
  const { agentState, _triggerReply } = useContext(AgentsContext);

  return (
    <div className="card">
      <div className="row">
        <div className="col-4 mt-3">
          <div className="form-group">
            <label>Sender Name</label>
            <input className="form-control" value="Sender NAme" disabled />
          </div>
        </div>
        <div className="col-3 mt-3">
          <div className="form-group">
            <label>Sender Email</label>
            <input className="form-control" value="Sender Email" disabled />
          </div>
        </div>
        <div className="col-3 mt-3">
          <div className="form-group">
            <label>Sender phone</label>
            <input className="form-control" value="Sender phone" disabled />
          </div>
        </div>
        <div className="col-2 mt-3">
          <div className="form-group">
            <label>Message date</label>
            <input className="form-control" value="Message date" disabled />
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows={4}
              className="form-control"
              value="Message..."
              disabled
            />
          </div>
        </div>
        {agentState.isReply ? (
          <div className="col-12 mt-3">
            <div className="form-group">
              <label>Type Your Message</label>
              <textarea
                rows={4}
                className="form-control"
                placeholder="Message..."
              />
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {agentState.isReply ? (
          <>
            <span
              className="btn btn-sm btn-warning"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
              onClick={() => _triggerReply("cancel")}
            >
              cancel
            </span>
            <span
              className="btn btn-sm btn-primary"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
              //   onClick={_triggerReply}
            >
              Send
            </span>
          </>
        ) : (
          <span
            className="btn btn-sm btn-success"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10%",
            }}
            onClick={() => _triggerReply("reply")}
          >
            Reply
          </span>
        )}
      </div>
    </div>
  );
}
