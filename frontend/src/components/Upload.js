// import React, { useState } from "react";

// function Upload({ setResult }) {   // 🔥 setLoading remove
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select an audio file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/upload/", {
//         method: "POST",
//         body: formData,
//       });

//       console.log("STATUS:", response.status);

//       const data = await response.json();
//       console.log("DATA:", data);

//       if (!response.ok) {
//         throw new Error(data.error || "Upload failed");
//       }

//       setResult(data); // 🔥 IMPORTANT
//     } catch (error) {
//       console.error("UPLOAD ERROR:", error);
//       alert(error.message);
//     }
//   };

//   return (
//   <div className="upload-container">

//     <div className="upload-box">

//       <div className="upload-icon">⬆️</div>

//       <h3>Drop your audio file here</h3>

//       <p>or click to browse • WAV, MP3 up to 50MB</p>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <p className="file-name">
//           Selected: {file.name}
//         </p>
//       )}

//       <button className="analyze-btn" onClick={handleUpload}>
//         Analyze
//       </button>

//     </div>

//   </div>
// );}

// export default Upload;
// import React, { useState } from "react";

// function Upload({ setResult }) {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Select file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("http://127.0.0.1:8000/api/upload/", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (data.error) {
//       alert(data.error);
//       return;
//     }

//     setResult(data);
//   };

//   return (
//     <div className="upload-container">

//       <h1 className="title">
//         Deepfake Audio <span>Detector</span>
//       </h1>

//       <p className="subtitle">
//         Upload an audio file to analyze authenticity
//       </p>

//       <div className="upload-box">

//         {/* <div className="upload-icon">⬆️</div> */}
//         <div className="upload-icon" style={{
//   fontSize: "40px",
//   background: "#001f2f",
//   borderRadius: "15px",
//   padding: "15px",
//   display: "inline-block"
// }}>
//   ⬆️
// </div>
//         <input
//           type="file"
//           accept="audio/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         {file && <p className="file-name">{file.name}</p>}

//         <button className="analyze-btn" onClick={handleUpload}>
//           Analyze
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Upload;
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

    const res = await fetch("https://deepfake-backend-65vl.onrender.com/api/upload/", {
      method: "POST",
      body: formData,
      mode: "cors"
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setResult(data);
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