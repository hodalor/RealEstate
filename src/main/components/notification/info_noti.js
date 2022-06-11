export default function InfoNoti(props) {
  return (
    <div
      className="form-control"
      style={{
        width: "80%",
        height: "35px",
        marginTop: "5px",
        marginBottom: "2px",
        marginLeft: "10px",
        marginRight: "10px",
        paddingLeft: "10px",
        display: "flex",
        alignItems: "center",
        color: "whitesmoke",
        fontWeight: "bold",
        backgroundColor: "blue"
      }}
    >
      {props.msg}
    </div>
  );
}
