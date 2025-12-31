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

  // THEME COLORS
  const isDark = theme === "dark";
  const pageBg = isDark ? "#0D0D0D" : "#F9F9F9";
  const cardBg = isDark ? "#1A1A1A" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subText = isDark ? "#BBBBBB" : "#555555";
  const inputBg = isDark ? "#111" : "#FFF";
  const inputBorder = isDark ? "#444" : "#CCC";


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
      <div className="container py-4" style={{ maxWidth: "900px" }}>

        {/* Page Title */}
        <h2 className="fw-bold text-center mb-3" style={{ color: textColor }}>
          🤖 SmartReply AI
        </h2>
        <p className="text-center mb-4" style={{ color: subText }}>
          Ask anything and get instant AI-powered responses.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">

            {/* Card */}
            <div
              className="card p-4 shadow-sm border-0 rounded-4"
              style={{ backgroundColor: cardBg, color: textColor }}
            >

              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <label className="form-label fw-bold" style={{ color: textColor }}>
                  Enter your question
                </label>

                <textarea
                  className="form-control mb-3"
                  style={{
                    height: "120px",
                    backgroundColor: inputBg,
                    color: textColor,
                    borderColor: inputBorder,
                  }}
                  placeholder="Example: Summarize this content or Explain AI in simple words..."
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
                <div className="alert alert-danger text-center mt-3">{err}</div>
              )}

              {/* Output */}
              <div className="mt-4">
                <label className="form-label fw-bold" style={{ color: textColor }}>
                  AI Response
                </label>

                <textarea
                  className="form-control"
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
