import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddTeam from "./pages/AddTeam";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/addTeam" element={<AddTeam />} />
      </Routes>
    </>
  );
}
