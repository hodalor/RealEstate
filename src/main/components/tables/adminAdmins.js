import { useContext } from "react";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AdminAdminsTable() {
  const { adminData } = useContext(AdminContext);
  const admins = adminData.admins || [];

  return (
    <div className="table-responsive">
      <table className="table td_2 table-striped table-hover vcenter">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Authorizations</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No admin users found
              </td>
            </tr>
          ) : (
            admins.map((admin) => (
              <tr key={admin._id}>
                <td>
                  <img
                    src={admin.image || "/assets/image/user.jpg"}
                    className="w30 rounded mr-2"
                    alt="admin"
                  />
                  {[admin.firstName, admin.lastName].filter(Boolean).join(" ")}
                </td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>{admin.role}</td>
                <td>{(admin.authorizations || []).length ? admin.authorizations.join(", ") : "Full access"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
