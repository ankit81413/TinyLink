import { useState } from "react";
import api from "../api";

function AddLinkForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let req = {
      name: name,
      url: url,
      code: code || "",
    };

    try {
      await api.post("/api/links", req);

      setName("");
      setUrl("");
      setCode("");

      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Code already exists. Please use another code.");
        setCode("");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container card p-4 mt-5">
      <h5>Create Short Link</h5>

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Link Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="url"
        className="form-control mt-3"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Custom Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-3">Create</button>
      </div>
    </form>
  );
}

export default AddLinkForm;
