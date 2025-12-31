import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { getAccessToken } from "./utils/auth";

function PDFInsight() {
  const { theme } = useTheme();

  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf3, setPdf3] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  // ===== THEME COLORS =====
  const isDark = theme === "dark";
  const pageBg = isDark ? "#0D0D0D" : "#F9F9F9";
  const cardBg = isDark ? "#1A1A1A" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subText = isDark ? "#CCCCCC" : "#555555";
  const inputBg = isDark ? "#111111" : "#FFFFFF";
  const inputBorder = isDark ? "#555555" : "#CCCCCC";
  const text = theme === "light" ? "#000000" : "#FFFFFF";


  // 🔥 EXTRA CLEAR PLACEHOLDER COLORS
  const placeholderColor = isDark ? "#E0E0E0" : "#666666";

  const token = getAccessToken();

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

    try {
      const res = await fetch("https://geniehub.duckdns.org/testlambda/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "⚠️ Something went wrong. Please try again.");
        setAnswer("");
        return;
      }

      setAnswer(data.answer);
    } catch (err) {
      setError("❌ Server Down. Please try again later.");
      setAnswer("");
    }
  };

  return (
    <main
      className="mt-5 pt-5"
      style={{
        backgroundColor: pageBg,
        minHeight: "100vh",
        color: textColor,
      }}
    >
      {/* 🔥 STRONG PLACEHOLDER FIX */}
      <style>
        {`
          .pdfinsight-input::placeholder {
            color: ${placeholderColor};
            opacity: 1;
            font-weight: 500;
          }
        `}
      </style>

      <div className="container py-4" style={{ maxWidth: "900px" }}>
        {/* Title */}
        <h2 className="fw-bold text-center mb-3">📘 PDFInsight AI</h2>
        <p className="text-center mb-4" style={{ color: subText }}>
          Upload multiple PDFs and get accurate AI-generated answers in seconds.
        </p>

        {/* Card */}
        <div
          className="card p-4 shadow-sm border-0 rounded-4"
          style={{ backgroundColor: cardBg }}
        >
          <form onSubmit={handleSubmit}>
            <label className="form-label fw-semibold" style={{ color: text }}>
              Upload PDF files
            </label>

            {[setPdf1, setPdf2, setPdf3].map((setFun, idx) => (
              <input
                key={idx}
                type="file"
                accept="application/pdf"
                className="form-control mb-2 pdfinsight-input"
                style={{
                  backgroundColor: inputBg,
                  color: textColor,
                  borderColor: inputBorder,
                }}
                onChange={(e) => setFun(e.target.files[0])}
              />
            ))}

            <label className="form-label fw-semibold" style={{ color: text }}>
              Your Question *
            </label>

            <textarea
              className="form-control mb-3 pdfinsight-input" 
              placeholder="Ask anything related to the uploaded PDFs..."
              style={{
                height: "120px",
                backgroundColor: inputBg,
                color: textColor,
                borderColor: inputBorder,
              }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-bold"
            >
              🤖 Get Answer from PDFs
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger text-center mt-4">
            {error}
          </div>
        )}

        {/* Answer */}
        {answer && !error && (
          <div
            className="card mt-4 shadow-sm border-0 rounded-4"
            style={{ backgroundColor: cardBg }}
          >
            <div className="card-body">
              <label className="form-label fw-bold">
                AI Response
              </label>

              <textarea
                className="form-control pdfinsight-input"
                style={{
                  height: "350px",
                  backgroundColor: inputBg,
                  color: textColor,
                  borderColor: inputBorder,
                }}
                readOnly
                value={answer}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default PDFInsight;
