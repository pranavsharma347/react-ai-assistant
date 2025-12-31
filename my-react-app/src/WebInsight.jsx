
import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { getAccessToken } from "./utils/auth";

function WebInsight() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const { theme } = useTheme();
  const accessToken = getAccessToken();

  // THEME COLORS
  const bg = theme === "light" ? "#FFFFFF" : "#000000";
  const text = theme === "light" ? "#000000" : "#FFFFFF";
  const cardBg = theme === "light" ? "#F2F2F2" : "#121212";
  const inputBg = theme === "light" ? "#FFFFFF" : "#1A1A1A";
  const border = theme === "light" ? "#CCCCCC" : "#555555";
  const secondaryText = theme === "light" ? "#555" : "#CCCCCC";

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });


      const data = await res.json();

      if (!res.ok) {
        if (data.error_type === "error in url") {
          setError("🚨 Failed to load one or more URLs. Please retry after few seconds.");
        } else if (data.error_type === "Failed to handle urls") {
          setError("⚙️ Failed to handle URLs. Try different URLs.");
        } else if (data.error_type === "error in FAISS index") {
          setError("💥 Something went wrong. Please try again later.");
        } else if (data.error_type === "no_relevant_content") {
          setError("❗ No relevant content found for your question.");
        } else {
          setError(data.error || "Something went wrong. Please try again.");
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
    <main
      className="mt-5 pt-5"
      style={{ background: bg, minHeight: "100vh", color: text, transition: "0.3s" }}
    >
      <div className="container py-4" style={{ maxWidth: "900px" }}>

        {/* Title */}
        <h2 className="fw-bold text-center mb-3" style={{ color: text }}>
          🌐 WebInsight AI
        </h2>

        <p className="text-center mb-4" style={{ color: secondaryText }}>
          Ask questions from multiple web pages and get accurate AI responses instantly.
        </p>

        {/* Main Card */}
        <div
          className="card p-4 shadow-sm border-0 rounded-4"
          style={{ background: cardBg, color: text, transition: "0.3s" }}
        >
          <form onSubmit={handleSubmit}>
            <label className="form-label fw-semibold" style={{ color: text }}>
              Enter URLs
            </label>

            <input
              type="url"
              className="form-control mb-2"
              placeholder="URL 1 (required)"
              style={{
                background: inputBg,
                color: text,
                borderColor: border,
                transition: "0.3s",
              }}
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
            />

            <input
              type="url"
              className="form-control mb-2"
              placeholder="URL 2 (optional)"
              style={{
                background: inputBg,
                color: text,
                borderColor: border,
              }}
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
            />

            <input
              type="url"
              className="form-control mb-3"
              placeholder="URL 3 (optional)"
              style={{
                background: inputBg,
                color: text,
                borderColor: border,
              }}
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
            />

            <label className="form-label fw-semibold" style={{ color: text }}>
              Your Question *
            </label>
            <textarea
              className="form-control mb-3"
              placeholder="Type your question here..."
              style={{
                height: "120px",
                background: inputBg,
                color: text,
                borderColor: border,
              }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className={`btn w-100 py-2 fw-bold ${theme === "light" ? "btn-dark" : "btn-light"
                }`}
            >
              🚀 Get Smart Answer
            </button>
          </form>
        </div>

        {/* ERRORS */}
        {error && (
          <div
            className={`alert mt-4 text-center ${theme === "light" ? "alert-danger" : "alert-danger"
              }`}
          >
            {error}
          </div>
        )}

        {/* OUTPUT */}
        {answer && !error && (
          <div
            className="card mt-4 shadow-sm border-0 rounded-4"
            style={{ background: cardBg, color: text }}
          >
            <div className="card-body">
              <label className="form-label fw-bold" style={{ color: text }}>
                AI Response
              </label>

              <textarea
                className="form-control"
                style={{
                  height: "350px",
                  background: inputBg,
                  color: text,
                  borderColor: border,
                }}
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
