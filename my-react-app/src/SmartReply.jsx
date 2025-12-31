import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { getAccessToken } from "./utils/auth";

function SmartReply() {
  console.log("SmartReply Loaded");
  const { theme } = useTheme();

  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  // ===== THEME COLORS =====
  const isDark = theme === "dark";
  const pageBg = isDark ? "#0D0D0D" : "#F9F9F9";
  const cardBg = isDark ? "#1A1A1A" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subText = isDark ? "#CCCCCC" : "#555555";
  const inputBg = isDark ? "#111111" : "#FFFFFF";
  const inputBorder = isDark ? "#555555" : "#CCCCCC";
  const textc = theme === "light" ? "#000000" : "#FFFFFF";

  

  // 🔥 EXTRA CLEAR PLACEHOLDER COLOR
  const placeholderColor = isDark ? "#E0E0E0" : "#666666";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);
    setError("");

    const payload = { question: text };
    const token = getAccessToken();

    try {
      const res = await fetch("https://geniehub.duckdns.org/AIGenerator/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error_type === "generation_error") {
          setError(
            "🚫 Something went wrong while generating answer. Please try again."
          );
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
    <main
      className="mt-5 pt-5"
      style={{
        backgroundColor: pageBg,
        minHeight: "100vh",
        color: textColor,
      }}
    >
      {/* 🔥 STRONG PLACEHOLDER FIX (DARK + LIGHT) */}
      <style>
        {`
          .smartreply-input::placeholder {
            color: ${placeholderColor};
            opacity: 1;
            font-weight: 500;
          }
        `}
      </style>

      <div className="container py-4" style={{ maxWidth: "900px" }}>
        {/* Page Title */}
        <h2 className="fw-bold text-center mb-3">🤖 SmartReply AI</h2>
        <p className="text-center mb-4" style={{ color: subText }}>
          Ask anything and get instant AI-powered responses.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">

            {/* Card */}
            <div
              className="card p-4 shadow-sm border-0 rounded-4"
              style={{ backgroundColor: cardBg }}
            >

              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <label className="form-label fw-bold" style={{ color: textc }}>
                  Enter your question
                </label>

                <textarea
                  className="form-control mb-3 smartreply-input"
                  style={{
                    height: "120px",
                    backgroundColor: inputBg,
                    color: textColor,
                    borderColor: inputBorder,
                  }}
                  placeholder="Example: Summarize this content or explain AI in simple words..."
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? "⏳ Generating..." : "Generate Response"}
                </button>
              </form>

              {/* Error Message */}
              {err && (
                <div className="alert alert-danger text-center mt-3">
                  {err}
                </div>
              )}

              {/* Output */}
              <div className="mt-4">
                <label className="form-label fw-bold" style={{ color: textc }}>
                  AI Response
                </label>

                <textarea
                  className="form-control smartreply-input"
                  style={{
                    height: "350px",
                    backgroundColor: inputBg,
                    color: textColor,
                    borderColor: inputBorder,
                  }}
                  readOnly
                  value={
                    loading
                      ? "⏳ Please wait... Generating response..."
                      : responseData?.result || ""
                  }
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default SmartReply;
