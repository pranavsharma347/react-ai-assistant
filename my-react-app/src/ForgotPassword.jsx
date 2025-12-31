import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎨 Dark Theme (UNCHANGED)
  const bg = "#0D0D0D";
  const cardBg = "#1A1A1A";
  const text = "#FFFFFF";
  const muted = "#BBBBBB";
  const border = "#333";

  // 🔐 SEND RESET EMAIL
  const handleResetEmail = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("❌ Please enter your registered email address");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://geniehub.duckdns.org/user/password-reset-email/",
        { email }
      );

      setMessage(
        "📧 Password reset email sent successfully. Please check your inbox."
      );
      setEmail("");

    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "❌ No account found with this email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* 🔥 FULL SCREEN PROCESSING */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#fff",
            fontSize: "18px",
          }}
        >
          Processing… Please wait
        </div>
      )}

      <div
        className="shadow-lg rounded-4 p-5 w-100"
        style={{
          maxWidth: "420px",
          backgroundColor: cardBg,
          border: `1px solid ${border}`,
        }}
      >
        <h3 className="fw-bold mb-2" style={{ color: text }}>
          Forgot Password 🔐
        </h3>

        <p className="mb-4" style={{ color: muted, fontSize: "14px" }}>
          Enter your IntelliDocs registered email and we’ll send you a link to reset your
          password.
        </p>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {message && (
          <div className="alert alert-success py-2 text-center">
            {message}
          </div>
        )}

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter your email address"
          className="form-control mb-3"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* SEND EMAIL BUTTON */}
        <button
          onClick={handleResetEmail}
          disabled={loading}
          className="btn w-100 fw-bold mb-3"
          style={{
            background: "linear-gradient(135deg, #FF7B00, #FF5100)",
            color: "#fff",
            borderRadius: "30px",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        {/* BACK TO LOGIN */}
        <div className="text-center mt-3">
          <Link to="/login" style={{ color: "#FF7B00", fontSize: "14px" }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
