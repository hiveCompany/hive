import { Route, Routes } from "react-router-dom";
import UsersList from "../user_components/users_list";
import CreatrUsersGroup from "./createUsersGroup";

function AdminMainBord() {
  return (
    <div className="main_bord">
      <Routes>
        <Route path="users_list" element={<UsersList />} />
        <Route path="create_group" element={<CreatrUsersGroup />} />
      </Routes>
    </div>
  );
}

export default AdminMainBord;
