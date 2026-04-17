
import React, { useState } from "react";

function Upload({ setResult }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
  if (!file) {
    alert("Select file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("https://deepfake-backend-65vl.onrender.com/api/upload/", {
      method: "POST",
      body: formData,
    });

    let data;

    try {
      data = await res.json();
    } catch {
      alert("Server response error");
      return;
    }

    if (data.error) {
      alert(data.error);
      return;
    }

    setResult(data);

  } catch (err) {
    alert("Network error");
  }
};

  return (
    <div className="upload-container">
      
      <div className="upload-box">

        <div className="upload-icon">
          ⬆️
        </div>

        <p>Drop your audio file here</p>
        <p className="sub">
          or click to browse • WAV, MP3 up to 50MB
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && <p className="file-name">{file.name}</p>}

        <button className="analyze-btn" onClick={handleUpload}>
          Analyze
        </button>

      </div>
    </div>
  );
}

export default Upload;