import React from "react";

const ResultPage = ({ data, goBack }) => {
  if (!data) return null;

  const isFake = data.result === "DEEPFAKE";

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.top}>
        <button onClick={goBack} style={styles.back}>
          ← Back to analyzer
        </button>

        <button style={styles.download}>Download Report</button>
      </div>

      {/* Title */}
      <h1 style={styles.title}>Analysis Results</h1>
      <p style={styles.filename}>{data.filename || "audio.mp3"}</p>

      {/* RESULT CARD */}
      <div
        style={{
          ...styles.resultCard,
          border: isFake ? "1px solid red" : "1px solid #00ff88",
          boxShadow: isFake
            ? "0 0 25px rgba(255,0,0,0.6)"
            : "0 0 25px rgba(0,255,136,0.6)",
        }}
      >
        <div style={styles.resultHeader}>
          <span
            style={{
              ...styles.badge,
              background: isFake ? "#ff0033" : "#00ff88",
            }}
          >
            {isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC"}
          </span>

          <span style={styles.time}>
            {new Date().toLocaleString()}
          </span>
        </div>

        {/* Confidence */}
        <h2 style={styles.conf}>
          Confidence: {(data.confidence ?? 0).toFixed(2)}%
        </h2>

        <div style={styles.barBg}>
          <div
            style={{
              ...styles.bar,
              width: `${data.confidence ?? 0}%`,
              background: isFake ? "#ff0033" : "#00ffff",
            }}
          />
        </div>

        {/* ✅ NEW → Risk Score */}
        {/* <p
          style={{
            marginTop: "12px",
            color: (data.risk_score ?? 0) > 50 ? "red" : "#00ff88",
            fontWeight: "bold",
          }}
        >
          Risk Score: {data.risk_score ?? 0}%{" "}
          {(data.risk_score ?? 0) > 50 ? "⚠ Risky" : "✔ Safe"}
        </p> */}
        {/* ✅ NEW → Risk + ERR */}
<p
  style={{
    marginTop: "12px",
    color: (data.risk_score ?? 0) > 50 ? "red" : "#00ff88",
    fontWeight: "bold",
  }}
>
  Risk Score: {data.risk_score ?? 0}%  
</p>

<p
  style={{
    color: (data.risk_score ?? 0) > 50 ? "red" : "#00ff88",
    fontWeight: "bold",
  }}
>
  ERR (Estimated): {data.risk_score ?? 0}%{" "}
  {(data.risk_score ?? 0) > 50 ? "⚠ Risky" : "✔ Safe"}
</p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* AI MODEL */}
        <div style={styles.card}>
          <h3>🤖 AI Model Fingerprint</h3>

          {data.model_predictions ? (
            Object.entries(data.model_predictions).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 15 }}>
                <p>{key}</p>
                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.bar,
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>No model data</p>
          )}
        </div>

        {/* SPECTROGRAM */}
        <div style={styles.card}>
          <h3>🖼️ Mel Spectrogram</h3>

          {data.spectrogram ? (
            <img
              src={`http://127.0.0.1:8000${data.spectrogram}`}
              alt="spec"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          ) : (
            <p style={{ color: "#888" }}>No spectrogram</p>
          )}
        </div>

        {/* FILE DETAILS */}
        <div style={styles.card}>
          <h3>📄 File Details</h3>
          <p>File Name: {data.filename || "-"}</p>
          <p>Size: {data.size || "-"} KB</p>
          <p>ID: {data.analysis_id || "-"}</p>
        </div>

        {/* PROVENANCE */}
        <div style={styles.card}>
          <h3>🔐 Provenance Tag</h3>

          {isFake ? (
            <div style={styles.fakeBox}>
              No provenance tag issued — AI generated
            </div>
          ) : (
            <div style={styles.realBox}>
              ✔ Authentic audio verified
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
const styles = {
  container: {
    background: "#050b14",
    color: "white",
    minHeight: "100vh",
    padding: "30px",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  back: {
    background: "transparent",
    border: "1px solid cyan",
    color: "cyan",
    padding: "8px 14px",
    cursor: "pointer",
  },

  download: {
    background: "linear-gradient(90deg,#00f0ff,#0066ff)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "white",
  },

  title: {
    fontSize: "32px",
    marginBottom: 5,
  },

  filename: {
    color: "#aaa",
    marginBottom: 20,
  },

  resultCard: {
    padding: 25,
    borderRadius: 12,
    marginBottom: 30,
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: 6,
    color: "black",
    fontWeight: "bold",
  },

  time: {
    color: "#888",
  },

  conf: {
    marginTop: 15,
  },

  barBg: {
    background: "#222",
    height: 8,
    borderRadius: 5,
    marginTop: 10,
  },

  bar: {
    height: "100%",
    borderRadius: 5,
    background: "cyan",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  card: {
    background: "#0b1220",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,255,255,0.2)",
  },

  fakeBox: {
    background: "#220000",
    padding: 10,
    borderRadius: 6,
    color: "red",
  },

  realBox: {
    background: "#002200",
    padding: 10,
    borderRadius: 6,
    color: "#00ff88",
  },
};
export default ResultPage;