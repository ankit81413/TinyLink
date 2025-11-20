import { Link } from "react-router-dom";
import AddLinkForm from "../components/AddLinkForm";

function Addlink() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between">
        <div></div>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </div>
      <AddLinkForm />
    </div>
  );
}

export default Addlink;
