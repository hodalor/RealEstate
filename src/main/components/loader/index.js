import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

export default function Loader(props) {
  const title = props.title;

  if (!title || title === undefined || title === null)
    return (
      <div
        className="form-control"
        style={{
          width: "100%",
          height: "35px",
          marginTop: "2px",
          marginBottom: "2px",
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "whitesmoke",
          backgroundColor: "#7e6990",
        }}
      >
        <Oval height="25" width="25" color="white" ariaLabel="loading" />
      </div>
    );

  if (title === "auth")
    return (
      <div
        className="form-control"
        style={{
          width: "100%",
          height: "35px",
          marginTop: "2px",
          marginBottom: "2px",
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "whitesmoke",
          backgroundColor: "#20BFA9"
        }}
      >
        <Oval height="25" width="25" color="white" ariaLabel="loading" />
      </div>
    );
}
