import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/api/links/${code}`).then((res) => setData(res.data));
  }, [code]);

  if (!data) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h3>Stats for: {code}</h3>

      <div className="card p-4 mt-3">
        <p>
          <strong>Name:</strong> {data.name}
        </p>

        <p>
          <strong>Original URL:</strong> {data.url}
        </p>

        <p>
          <strong>Total Clicks:</strong> {data.clicks}
        </p>

        

        <p>
          <strong>Last Clicked:</strong>{" "}
          {data.last_clicked
            ? new Date(data.last_clicked).toLocaleString()
            : "-"}
        </p>
      </div>
    </div>
  );
}

export default Stats;
