export default function PageTitle() {
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2>
            Property Listing
            <small>Welcome to HodalorEstate</small>
          </h2>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <ul className="breadcrumb float-md-right">
            <li className="breadcrumb-item">
              <span>
                <i className="fa fa-home" /> HodalorEstate
              </span>
            </li>
            <li className="breadcrumb-item">
              <span>Buyers Page</span>
            </li>
            <li className="breadcrumb-item active">Property Listing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
