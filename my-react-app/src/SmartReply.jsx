// import {useState,useEffect} from "react";

// function SmartReply()
// {
//     const[text,setText]=useState("")
//     const[responseData,setResponseData]=useState(null)
//     const [loading, setLoading] = useState(false); // ✅ loading state
//     const[err ,setError]=useState("")


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true)

//     const payload = { question:text}; // data to send
//     console.log(payload)

//     const res = await fetch("https://geniehub.duckdns.org/AIGenerator/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       if(data.error_type === "generation_error") {   
//         setError("🚫 Something went wrong while generating answer. Please try again.")
//       }
//       setLoading(false);
//       return;
//     } 
//     setLoading(true)
//     setResponseData(data); 
//   };

//   useEffect(() => {
//     if (responseData) {
//       console.log("Data posted successfully:", responseData);
//       setLoading(false)
//     }
//   }, [responseData]); // dependency array


//     return (
//     <>

//         <div
//       className="d-flex justify-content-center align-items-center vh-100 bg-light"
//     >
//       <div className="card p-4 shadow" style={{ width: "700px" }}>
//         <h4 className="text-center mb-3">SmartReply AI</h4>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleInput" className="form-label">
//               Enter Your Text
//             </label>
//             <input
//               type="text"
//               placeholder="Type something..."
//               className="form-control"
//               id="exampleInput"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100" onClick={() => {
//           const value = document.getElementById("exampleInput").value; // 👈 yaha se value lete hain
//         setText(value); // aur function me pass karte hain
//         }}>
//             Submit
//           </button>
//         </form>

//         <div className="mt-3">
//           <label htmlFor="floatingTextarea2" className="form-label">
//             Response
//           </label>
//           <textarea
//             className="form-control"
//             id="floatingTextarea2"
//             style={{ height: "400px" }}
//             value={
//               loading
//                 ? "⏳ Please wait... Generating response..."
//                 : responseData?.result || ""
//             }
//             readOnly
//           />
//           <h6>Made By Pranav</h6>
//         </div>
//       </div>
//     </div>

//        </>
// );
// }

// export default SmartReply;


import React, { useState, useEffect } from "react";

function SmartReply() {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);
    setError("");

    const payload = { question: text };
    console.log(payload);

    try {
      const res = await fetch("https://geniehub.duckdns.org/AIGenerator/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error_type === "generation_error") {
          setError("🚫 Something went wrong while generating answer. Please try again.");
        }
        setLoading(false);
        return;
      }

      setResponseData(data);
    } catch (err) {
      setError("⚠ Network Error: Please check your internet connection.");
    }

    setLoading(false);
  };

  return (
    <main className="mt-5 pt-5 bg-light">
      <div className="container py-4">
        {/* Page Title */}
        <h2 className="fw-bold text-center mb-4">🤖 SmartReply AI</h2>
        <p className="text-center text-muted mb-4">
          Ask anything and get instant AI-powered responses.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">

            {/* Card Box */}
            <div className="card p-4 shadow-sm border-0 rounded-4">

              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <label className="form-label fw-bold">Enter your question</label>
                <textarea
                  className="form-control mb-3"
                  style={{ height: "120px" }}
                  placeholder="Example: Summarize this content or Explain AI in simple words..."
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? "⏳ Generating..." : "Generate Response"}
                </button>
              </form>

              {/* Error Message */}
              {err && (
                <div className="alert alert-danger text-center mt-3">{err}</div>
              )}

              {/* Response Output Section */}
              <div className="mt-4">
                <label className="form-label fw-bold">AI Response</label>
                <textarea
                  className="form-control"
                  style={{ height: "350px" }}
                  readOnly
                  value={
                    loading
                      ? "⏳ Please wait... Generating response..."
                      : responseData?.result || ""
                  }
                />
              </div>

              {/* <p className="text-center mt-3 text-muted small">
                Made with ❤️ by <strong>Pranav</strong>
              </p> */}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default SmartReply;
