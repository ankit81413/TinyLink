import { Link, Routes, Route } from "react-router-dom";
import Addlink from "../Pages/Addlink";
import LinkTable from "../components/LinkTable";

function Dashboard() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="">TinyLink Dashboard</h2>
        <Link className="btn btn-primary" to="/add-link">
          + Add new Link
        </Link>
      </div>
      {/* <AddLinkForm /> */}
      <Routes>
        <Route path="/" element={<LinkTable />} />
        <Route path="/add-link" element={<Addlink />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
