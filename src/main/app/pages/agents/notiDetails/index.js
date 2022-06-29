import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function NotiDetails() {
  const { agentState, _triggerReply, _delReq, _goToDetails } =
    useContext(AgentsContext);
  const { loading } = useContext(AuthContext);
  const request = agentState.request;

  return (
    <div className="card">
      <div className="row">
        <div className="col-4 mt-3">
          <div className="form-group">
            <label>Sender Name</label>
            <input className="form-control" value={request.userName} disabled />
          </div>
        </div>
        <div className="col-4 mt-3">
          <div className="form-group">
            <label>Sender Contact</label>
            <input
              className="form-control"
              value={request.userContact}
              disabled
            />
          </div>
        </div>
        <div className="col-4 mt-3">
          <div className="form-group">
            <label>Property Name</label>
            <input
              className="form-control"
              value={request.property.propName}
              disabled
            />
          </div>
        </div>
        <div className="col-4 mt-3">
          <div className="form-group">
            <label>Property Location</label>
            <input
              className="form-control"
              value={request.property.propLocation}
              disabled
            />
          </div>
        </div>
        <div className="col-2 mt-3">
          <div className="form-group">
            <label>Message date</label>
            <input
              className="form-control"
              value={new Date(request.createdAt).toDateString()}
              disabled
            />
          </div>
        </div>
        {/* <div className="col-12 mt-3">
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows={4}
              className="form-control"
              value="Message..."
              disabled
            />
          </div>
        </div> */}
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
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <Notify />
            <span
              className="btn btn-sm btn-warning"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
              // onClick={() => _triggerReply("cancel")}
              onClick={() => _goToDetails(request.property.propID)}
            >
              View Property
            </span>
            <span
              className="btn btn-sm btn-success"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
              // onClick={() => _triggerReply("reply")}
              onClick={() => _delReq(request._id)}
            >
              Delete
            </span>
          </>
        )}
      </div>
    </div>
  );
}
