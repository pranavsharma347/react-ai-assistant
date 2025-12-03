import React, { useState } from "react";

function PDFInsight() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
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
    if (!pdf1 && !pdf2 && !pdf3) {
      setError("⚠️ Please upload at least one PDF file.");
      return;
    }

    const formData = new FormData();
    if (pdf1) formData.append("files_uploaded", pdf1);
    if (pdf2) formData.append("files_uploaded", pdf2);
    if (pdf3) formData.append("files_uploaded", pdf3);
    formData.append("question", question);

    setAnswer("⏳ Analyzing your PDFs...");
    setError("");

    try {
      const res = await fetch("https://geniehub.duckdns.org/testlambda/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error_type === "input_error") {
          setError("🚫 Please upload valid PDF files and enter your question.");
        } else if (data.error_type === "no_conten") {
          setError("⚙️ Uploaded PDFs have no readable content. Try with different files.");
        } else if (data.error_type === "pdf_read_error") {
          setError("💥 Unable to read the uploaded PDFs. Please upload valid documents.");
        } else if (data.error_type === "embedding_error") {
          setError("💭 System failed to process your documents. Please retry later.");
        } else if (data.error_type === "llm_init_error") {
          setError("🤖 AI system failed to initialize. Please try again after a few seconds.");
        } else if (data.error_type === "generation_error") {
          setError("Something went wrong while generating answer. Please try again.");
        } else {
          setError(data.error || "⚠️ Something went wrong. Please try again.");
        }
        setAnswer("");
        return;
      }

      setAnswer(data.answer);
      setError("");
    } catch (err) {
      setError("❌ Server Down. Please try again later.");
      setAnswer("");
    }
  };

  return (
    <main className="mt-5 pt-5 bg-light">
      <div className="container py-4" style={{ maxWidth: "900px" }}>
        
        {/* Title Section */}
        <h2 className="fw-bold text-center mb-3">📘 PDFInsight AI</h2>
        <p className="text-center text-muted mb-4">
          Upload multiple PDFs and get accurate AI-generated answers in seconds.
        </p>

        {/* Main Card */}
        <div className="card p-4 shadow-sm border-0 rounded-4">
          <form onSubmit={handleSubmit}>

            <label className="form-label fw-semibold">Upload PDF files</label>
            
            <input
              type="file"
              accept="application/pdf"
              className="form-control mb-2"
              onChange={(e) => setPdf1(e.target.files[0])}
            />
            
            <input
              type="file"
              accept="application/pdf"
              className="form-control mb-2"
              onChange={(e) => setPdf2(e.target.files[0])}
            />
            
            <input
              type="file"
              accept="application/pdf"
              className="form-control mb-3"
              onChange={(e) => setPdf3(e.target.files[0])}
            />

            <label className="form-label fw-semibold">Your Question *</label>
            <textarea
              className="form-control mb-3"
              placeholder="Ask anything related to the uploaded PDFs..."
              style={{ height: "120px" }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
              🤖 Get Answer from PDFs
            </button>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger text-center mt-4">{error}</div>
        )}

        {/* Answer box */}
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

export default PDFInsight;
