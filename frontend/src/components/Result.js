import React from "react";

function Result({ data, reset }) {
  const isFake = data.result === "DEEPFAKE";

  return (
    <div className="result">

      <button onClick={reset}>← Back</button>

      <h1>Analysis Result</h1>

      <div className={`card ${isFake ? "fake" : "real"}`}>
        <h2>{data.result}</h2>
        <p>Confidence: {data.confidence}%</p>

        <div className="bar">
          <div
            className="fill"
            style={{ width: `${data.confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>AI Models</h3>
          {Object.entries(data.models).map(([k, v]) => (
            <p key={k}>{k}: {v}%</p>
          ))}
        </div>

        <div className="card">
          <h3>Spectrogram</h3>
          <img
            src={`http://127.0.0.1:8000${data.spectrogram}`}
            width="100%"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Result;