// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import ResultPage from "./pages/ResultPage";
// import "./App.css";

// function App() {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//       <Navbar />

//       {/* Loading UI */}
//       {loading && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <div className="loader"></div>
//           <p style={{ color: "cyan" }}>Analyzing audio...</p>
//         </div>
//       )}

//       {/* Pages */}
//       {!result ? (
//         <Home setResult={setResult} setLoading={setLoading} />
//       ) : (
//         <ResultPage
//           data={result}
//           goBack={() => setResult(null)}
//         />
//       )}
//     </>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import Upload from "./components/Upload";
// import ResultPage from "./pages/ResultPage";   
// import HistoryPage from "./pages/HistoryPage"; 
// function App() {
//   const [page, setPage] = useState("analyze");
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);

//   const handleResult = (data) => {
//     setResult(data);
//     setHistory([data, ...history]); // save history
//     setPage("result");
//   };

//   return (
//     <div>
//       {/* 🔹 Navbar */}
//       <div className="navbar">
//   <h2 className="logo">DeepScan.ai</h2>

//   <div>
//     <button onClick={() => setPage("analyze")}>Analyze</button>
//     <button onClick={() => setPage("history")}>History</button>
//   </div>
// </div>

//       {/* 🔹 Pages */}
//       {page === "analyze" && (
//         <Upload setResult={handleResult} />
//       )}

//       {page === "result" && (
//         <ResultPage data={result} goBack={() => setPage("analyze")} />
//       )}

//       {page === "history" && <HistoryPage history={history} />}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import "./App.css"
import Upload from "./components/Upload";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [page, setPage] = useState("analyze");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ ADD THIS

  const handleResult = (data) => {
    setResult(data);
    setHistory([data, ...history]); // save history
    setPage("result");
  };

  return (
    <div className="app-bg"> {/* ✅ BACKGROUND FIX */}

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
        <Upload setResult={handleResult} setLoading={setLoading} />  // ✅ FIX
      )}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          🔄 Analyzing...
        </p>
      )}

      {page === "result" && (
        <ResultPage data={result} goBack={() => setPage("analyze")} />
      )}

      {page === "history" && (
        <HistoryPage history={history} />
      )}

    </div>
  );
}

export default App;