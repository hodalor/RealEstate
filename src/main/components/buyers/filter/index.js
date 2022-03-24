export default function FilterComp() {
  return (
    <div className="row clearfix">
      <div className="input-group col-lg-8">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Area"
        />
        <span class="input-group-addon">
          <i class="fa fa-filter"></i>
        </span>
      </div>
      <div className="form-group col-lg-4">
        <select className="form-control">
          <option>Filter by Price</option>
        </select>
      </div>
    </div>
  );
}
