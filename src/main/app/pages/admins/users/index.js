import UsersTable from "../../../../components/tables/users";

export default function Users() {
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="body">
              <UsersTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
