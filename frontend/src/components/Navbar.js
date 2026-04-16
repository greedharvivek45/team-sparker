import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <h2>DeepScan.ai</h2>

      <div className="nav-links">
        <span>Analyze</span>
        <span>History</span>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #222",
  },
  link: {
    marginLeft: "20px",
    cursor: "pointer",
    color: "#aaa",
  },
};

export default Navbar;