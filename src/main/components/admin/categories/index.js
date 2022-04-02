export default function Categories() {
  return (
    <div className="card">
      <h5 className="mt-3 ml-3">Sort by Category</h5>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox21">All</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox22">Single rooms</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox23">Apartments</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox24">Offices</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox25">Shops</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox29">Near main road</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
            />
            <label htmlFor="checkbox31">Villas</label>
          </div>
        </div>
      </div>
    </div>
  );
}
