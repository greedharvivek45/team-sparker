// import React from "react";
// import Upload from "../components/Upload";

// function Home({ setResult, setLoading }) {
//   return (
//     <div className="app-bg">

     
//       {/* FEATURES SECTION */}
//       <div className="features">
//         <div className="card">
//           <h3>🎯 Real-time Detection</h3>
//           <p>Instant analysis results</p>
//         </div>

//         <div className="card">
//           <h3>📊 Spectrogram Analysis</h3>
//           <p>Visual frequency mapping</p>
//         </div>

//         <div className="card">
//           <h3>🔐 Provenance Tagging</h3>
//           <p>Authenticity certification</p>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Home;
import React from "react";
import Upload from "../components/Upload";

function Home({ setResult, setLoading }) {
  return (
    <div className="app-bg">

      {/* 🔥 HERO SECTION */}
      <div className="hero">
        <div className="hero-inner">

          <p className="badge">● AI AUDIO FORENSICS</p>

          <h1 className="title">
            Deepfake Audio <span>Detector</span>
          </h1>

          <p className="subtitle">
            Upload an audio file to analyze its authenticity using advanced
            spectral analysis and AI model fingerprinting.
          </p>

          {/* 🔥 UPLOAD COMPONENT */}
          <Upload setResult={setResult} setLoading={setLoading} />

        </div>
      </div>

      {/* 🔥 FEATURES SECTION */}
      <div className="features">
        <div className="card">
          <h3>🎯 Real-time Detection</h3>
          <p>Instant analysis results</p>
        </div>

        <div className="card">
          <h3>📊 Spectrogram Analysis</h3>
          <p>Visual frequency mapping</p>
        </div>

        <div className="card">
          <h3>🔐 Provenance Tagging</h3>
          <p>Authenticity certification</p>
        </div>
      </div>

    </div>
  );
}

export default Home;