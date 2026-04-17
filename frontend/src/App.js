// import React, { useState } from "react";
// import "./App.css"
// // import Upload from "./components/Upload";
// import Home from "./pages/Home";
// import ResultPage from "./pages/ResultPage";
// import HistoryPage from "./pages/HistoryPage";

// function App() {
//   const [page, setPage] = useState("analyze");
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false); // ✅ ADD THIS

//   const handleResult = (data) => {
//     setResult(data);
//     setHistory([data, ...history]); // save history
//     setPage("result");
//   };

//   return (
//     <div className="app-bg"> {/* ✅ BACKGROUND FIX */}

//       {/* 🔹 Navbar */}
//       <div className="navbar">
//         <h2 className="logo">DeepScan.ai</h2>

//         <div>
//           <button onClick={() => setPage("analyze")}>Analyze</button>
//           <button onClick={() => setPage("history")}>History</button>
//         </div>
//       </div>

//       {/* 🔹 Pages */}
//       {/* {page === "analyze" && (
//         <Upload setResult={handleResult} setLoading={setLoading} />  // ✅ FIX
//       )} */}
//       {page === "analyze" && (
//   <Home setResult={handleResult} setLoading={setLoading} />
// )}
//       {loading && (
//         <p style={{ textAlign: "center", marginTop: "20px" }}>
//           🔄 Analyzing...
//         </p>
//       )}

//       {page === "result" && (
//         <ResultPage data={result} goBack={() => setPage("analyze")} />
//       )}

//       {page === "history" && (
//         <HistoryPage history={history} />
//       )}

//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [page, setPage] = useState("analyze");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // 🔥 FIXED (safe update)
  const handleResult = (data) => {
    setResult(data);
    setHistory((prev) => [data, ...prev]); // ✅ FIX
    setPage("result");
  };

  return (
    <div className="app-bg">

      {/* 🔹 Navbar */}
      <div className="navbar">
        <h2 className="logo">DeepScan.ai</h2>

        <div>
          <button onClick={() => setPage("analyze")}>Analyze</button>
          <button onClick={() => setPage("history")}>History</button>
        </div>
      </div>

      {/* 🔹 Pages */}
      {page === "analyze" && (
        <Home setResult={handleResult} />
      )}

      {page === "result" && (
        <ResultPage 
          data={result} 
          goBack={() => setPage("analyze")} 
        />
      )}

      {page === "history" && (
        <HistoryPage history={history} />
      )}

    </div>
  );
}

export default App;