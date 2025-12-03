// import React, { useState } from "react";

// function WebInsight() {
//   const [url1, setUrl1] = useState("");
//   const [url2, setUrl2] = useState("");
//   const [url3, setUrl3] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [error, setError] = useState("");

//   // ✅ handleSubmit sirf kaam karta hai, return nahi karta
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAnswer("");
//     setError("");
  



//     // ✅ Validation
//     if (!question.trim()) {
//       setError("⚠️ Please enter your question.");
//       return;
//     }
//     if (!url1.trim() && !url2.trim() && !url3.trim()) {
//       setError("⚠️ Please enter at least one URL.");
//       return;
//     }

//     const urls = [];
//     if (url1.trim()) urls.push(url1.trim());
//     if (url2.trim()) urls.push(url2.trim());
//     if (url3.trim()) urls.push(url3.trim());

//     const payload = { urls: urls, question: question };

//     // ✅ Simulate API
//     setAnswer("⏳ Generating AI answer...");
//     setError("")
//     try {
//       const res = await fetch("https://geniehub.duckdns.org/MultiUrls/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//       if (data.error_type === "error in url") {
//         setError("🚨 Failed to load one or more URLs. Please retry after few seconds.");
//       } 
//       else if (data.error_type === "Failed to handle urls") {
//         setError("⚙️ Failed to handle urls.Try with another urls");
//       } 
//       else if (data.error_type === "error in FAISS index") {
//         setError("💥 Something goes wrong . Please try again later.");
  
//       } 
//       else if (data.error_type === "no_relevant_content") {
//         setError("💥 No relevant content found related to your question.");
  
//       } 
//       else {
//         setError(data.error || "Some thing goes wrong please try again");
    
//       } 
//       setAnswer("");
//       return;
//     }
      

//       setAnswer(data.answer);
//       setError("");
//     } catch (err) {
//       setError("❌ Server Down. Please try again.");
//       setAnswer("");
//     }
//   };

//   // ✅ Yeh hi component ka return hai
//   return (
//     <div className="container my-5">
//       <h1 className="text-center mb-4 text-primary fw-bold fs-1">
//         🌐 WebInsight — Ask from Multiple URLs
//       </h1>

//       <div className="card shadow-lg border-0">
//         <div className="card-body p-4">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">URL 1 *</label>
//               <input
//                 type="url"
//                 className="form-control"
//                 placeholder="Enter first URL (required)"
//                 value={url1}
//                 onChange={(e) => setUrl1(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">URL 2</label>
//               <input
//                 type="url"
//                 className="form-control"
//                 placeholder="Enter second URL (optional)"
//                 value={url2}
//                 onChange={(e) => setUrl2(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">URL 3</label>
//               <input
//                 type="url"
//                 className="form-control"
//                 placeholder="Enter third URL (optional)"
//                 value={url3}
//                 onChange={(e) => setUrl3(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Your Question *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type your question here..."
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />
//             </div>

            
//             <div className="d-grid">
//               <button type="submit" className="btn btn-primary btn-lg fw-semibold">
//                 🚀 Get Smart Answer
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {error && (
//               <div className="alert alert-danger py-2" role="alert">
//                 {error}
//               </div>
//             )}

//       {answer && !error &&(
//         <div className="card mt-4 shadow-sm border-info">
//           <div className="card-body">
//             <h5 className="card-title text-info">Response:</h5>
//             <p className="card-text">{answer}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WebInsight;


import React, { useState } from "react";

function WebInsight() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");
    setError("");

    if (!question.trim()) {
      setError("⚠️ Please enter your question.");
      return;
    }
    if (!url1.trim() && !url2.trim() && !url3.trim()) {
      setError("⚠️ Please enter at least one URL.");
      return;
    }

    const urls = [];
    if (url1.trim()) urls.push(url1.trim());
    if (url2.trim()) urls.push(url2.trim());
    if (url3.trim()) urls.push(url3.trim());

    const payload = { urls: urls, question: question };

    setAnswer("⏳ Generating AI answer...");
    setError("");

    try {
      const res = await fetch("https://geniehub.duckdns.org/MultiUrls/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error_type === "error in url") {
          setError("🚨 Failed to load one or more URLs. Please retry after few seconds.");
        } else if (data.error_type === "Failed to handle urls") {
          setError("⚙️ Failed to handle urls.Try with another urls");
        } else if (data.error_type === "error in FAISS index") {
          setError("💥 Something goes wrong . Please try again later.");
        } else if (data.error_type === "no_relevant_content") {
          setError("💥 No relevant content found related to your question.");
        } else {
          setError(data.error || "Some thing goes wrong please try again");
        }
        setAnswer("");
        return;
      }

      setAnswer(data.answer);
      setError("");
    } catch (err) {
      setError("❌ Server Down. Please try again.");
      setAnswer("");
    }
  };

  return (
    <main className="mt-5 pt-5 bg-light">
      <div className="container py-4" style={{ maxWidth: "900px" }}>
        {/* Title */}
        <h2 className="fw-bold text-center mb-3">🌐 WebInsight AI</h2>
        <p className="text-center text-muted mb-4">
          Ask questions from multiple web pages and get accurate AI responses instantly.
        </p>

        {/* Main Card */}
        <div className="card p-4 shadow-sm border-0 rounded-4">
          <form onSubmit={handleSubmit}>
            {/* URL Fields */}
            <label className="form-label fw-semibold">Enter URLs</label>

            <input
              type="url"
              className="form-control mb-2"
              placeholder="URL 1 (required)"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
            />

            <input
              type="url"
              className="form-control mb-2"
              placeholder="URL 2 (optional)"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
            />

            <input
              type="url"
              className="form-control mb-3"
              placeholder="URL 3 (optional)"
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
            />

            {/* Question */}
            <label className="form-label fw-semibold">Your Question *</label>
            <textarea
              className="form-control mb-3"
              placeholder="Type your question here..."
              style={{ height: "120px" }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            {/* Button */}
            <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">
              🚀 Get Smart Answer
            </button>
          </form>
        </div>

        {/* ERRORS */}
        {error && (
          <div className="alert alert-danger text-center mt-4">{error}</div>
        )}

        {/* OUTPUT */}
        {answer && !error && (
          <div className="card mt-4 shadow-sm border-0 rounded-4">
            <div className="card-body">
              <label className="form-label fw-bold">AI Response</label>
              <textarea
                className="form-control"
                style={{ height: "350px" }}
                readOnly
                value={answer}
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default WebInsight;

