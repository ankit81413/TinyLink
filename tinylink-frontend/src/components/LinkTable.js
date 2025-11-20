import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function LinkTable() {
  const [links, setLinks] = useState([]);

  // Load all links
  const fetchLinks = () => {
    api.get("/api/links").then((res) => setLinks(res.data));
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code) => {
    await api.delete(`/api/links/${code}`);
    fetchLinks();
  };

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>URL</th>
          <th>Clicks</th>
          <th>Last Clicked</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link.code}>
            <td>{link.name || "-"}</td>

            <td>
              <Link to={`/code/${link.code}`}>{link.code}</Link>
            </td>

            <td>{link.url}</td>
            <td>{link.clicks}</td>

            <td>
              {link.last_clicked
                ? new Date(link.last_clicked).toLocaleString()
                : "-"}
            </td>
            <td className="d-flex">
              <Link
                className="btn btn-primary px-2 fs-6"
                to={`/code/${link.code}`}
              >
                <i className="fa-solid fa-eye"></i>
              </Link>
              <button
                className="btn btn-danger p-2 fs-6 ms-1"
                onClick={() => handleDelete(link.code)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <a
                className="btn btn-warning p-2 fs-6 ms-1"
                href={`${process.env.REACT_APP_API_URL}/${link.code}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className="fa-solid fa-share"></i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LinkTable;
