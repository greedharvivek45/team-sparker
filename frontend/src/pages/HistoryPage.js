import React from "react";

function HistoryPage({ history }) {
  return (
    <div style={styles.container}>
      <h1 style={{ color: "#0ff" }}>Analysis History</h1>

      {history.length === 0 ? (
        <p style={{ color: "#aaa" }}>No history yet</p>
      ) : (
        history.map((item, index) => (
          <div key={index} style={styles.card}>
            
            <h3 style={{
              color: item.result === "AUTHENTIC" ? "#00ff99" : "#ff4444"
            }}>
              {item.result}
            </h3>

            <p><b>File:</b> {item.filename || "Unknown"}</p>

            <p><b>Confidence:</b> {item.confidence}%</p>

            <p><b>ID:</b> {item.analysis_id || "-"}</p>

          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },

  card: {
    background: "#0b1220",
    padding: "20px",
    margin: "15px auto",
    maxWidth: "500px",
    borderRadius: "12px",
    border: "1px solid #00ffff30",
    boxShadow: "0 0 10px #00ffff20",
    textAlign: "left",
  },
};

export default HistoryPage;