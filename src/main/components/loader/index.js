import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

export default function Loader(props) {
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
        backgroundColor: "blue",
      }}
    >
      <Oval height="25" width="25" color="grey" ariaLabel="loading" />
    </div>
  );
}
