// import React, { useState } from "react";

// function Upload({ setResult, setLoading }) {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select an audio file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();

//       setResult(data);
//     } catch (error) {
//       console.error(error);
//       alert("Error uploading file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="drop-box">

//       <div style={{ fontSize: "40px", marginBottom: "10px" }}>
//         ⬆️
//       </div>

//       <h3>Drop your audio file here</h3>

//       <p style={{ color: "#aaa" }}>
//         or click to browse • WAV, MP3 up to 50MB
//       </p>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setFile(e.target.files[0])}
//         style={{ marginTop: "15px" }}
//       />

//       <br />

//       {file && (
//         <p style={{ marginTop: "10px", color: "#0ff" }}>
//           Selected: {file.name}
//         </p>
//       )}

//       <button
//         className="btn"
//         onClick={handleUpload}
//         style={{ marginTop: "20px" }}
//       >
//         Analyze
//       </button>

//     </div>
//   );
// }

// export default Upload;
// import React, { useState } from "react";

// function Upload({ setResult, setLoading }) {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select an audio file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const response = await fetch("http://127.0.0.1:8000/api/upload/", {
//         method: "POST",
//         body: formData,
//       });

//       // 🔴 DEBUG
//       console.log("STATUS:", response.status);

//       const data = await response.json();
//       console.log("DATA:", data);

//       if (!response.ok) {
//         throw new Error(data.error || "Upload failed");
//       }

//       setResult(data);
//     } catch (error) {
//       console.error("UPLOAD ERROR:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="drop-box">

//       <div style={{ fontSize: "40px", marginBottom: "10px" }}>
//         ⬆️
//       </div>

//       <h3>Drop your audio file here</h3>

//       <p style={{ color: "#aaa" }}>
//         or click to browse • WAV, MP3 up to 50MB
//       </p>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setFile(e.target.files[0])}
//         style={{ marginTop: "15px" }}
//       />

//       {file && (
//         <p style={{ marginTop: "10px", color: "#0ff" }}>
//           Selected: {file.name}
//         </p>
//       )}

//       <button
//         className="btn"
//         onClick={handleUpload}
//         style={{ marginTop: "20px" }}
//       >
//         Analyze
//       </button>

//     </div>
//   );
// }

// export default Upload;
import React, { useState } from "react";

function Upload({ setResult }) {   // 🔥 setLoading remove
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      console.log("STATUS:", response.status);

      const data = await response.json();
      console.log("DATA:", data);

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setResult(data); // 🔥 IMPORTANT
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert(error.message);
    }
  };

  return (
  <div className="upload-container">

    <h1 className="title">
      Deepfake Audio <span>Detector</span>
    </h1>

    <p className="subtitle">
      Upload an audio file to analyze its authenticity using AI
    </p>

    <div className="upload-box">

      <div className="upload-icon">⬆️</div>

      <h3>Drop your audio file here</h3>

      <p>or click to browse • WAV, MP3 up to 50MB</p>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <p className="file-name">
          Selected: {file.name}
        </p>
      )}

      <button className="analyze-btn" onClick={handleUpload}>
        Analyze
      </button>

    </div>

  </div>
);}

export default Upload;