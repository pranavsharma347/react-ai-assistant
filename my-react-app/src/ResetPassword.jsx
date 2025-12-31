import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const { uidb64, token } = useParams();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [validToken, setValidToken] = useState(false);

  // 🎨 Theme (UNCHANGED)
  const bg = "#0D0D0D";
  const cardBg = "#1A1A1A";
  const text = "#FFFFFF";
  const muted = "#BBBBBB";
  const border = "#333";

  // 🔐 VERIFY RESET TOKEN
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(
          `https://geniehub.duckdns.org/user/password-reset/${uidb64}/${token}/`
        );
        setValidToken(true);
      } catch {
        setError("❌ Reset link is invalid or expired");
      } finally {
        setCheckingToken(false);
      }
    };
    verifyToken();
  }, [uidb64, token]);

  // 🔁 RESET PASSWORD
  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,64}$/;

    if (!password || !password2) {
      setError("❌ Both password fields are required");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "❌ Password must include uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (password !== password2) {
      setError("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        "https://geniehub.duckdns.org/user/password-reset-complete/",
        {
          password,
          password2,
          uidb64,
          token,
        }
      );

      setMessage("✅ Password reset successful! You can now login.");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "❌ Failed to reset password. Try again."
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
        padding: 20,
      }}
    >
      {/* 🔥 FULL SCREEN PROCESSING */}
      {(loading || checkingToken) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#fff",
            fontSize: "18px",
          }}
        >
          {checkingToken ? "Verifying reset link…" : "Resetting password…"}
        </div>
      )}

      <div
        className="shadow-lg rounded-4 p-5 w-100"
        style={{
          maxWidth: 420,
          backgroundColor: cardBg,
          border: `1px solid ${border}`,
        }}
      >
        <h3 className="fw-bold mb-2" style={{ color: text }}>
          Reset Password 🔐
        </h3>

        <p className="mb-4" style={{ color: muted, fontSize: 14 }}>
          IntelliDocs — Create a new password for your account
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

        {/* FORM */}
        {validToken && !message && (
          <>
            {/* NEW PASSWORD */}
            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                className="form-control"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="position-relative mb-3">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirm new password"
                className="form-control"
                disabled={loading}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <span
                onClick={() => setShowPassword2(!showPassword2)}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* PASSWORD RULES */}
            <div style={{ color: muted, fontSize: "13px", marginBottom: "15px" }}>
              <strong>Password requirements:</strong>
              <ul style={{ paddingLeft: "18px", marginTop: "5px" }}>
                <li>✔ 8–64 characters long</li>
                <li>✔ At least 1 uppercase letter</li>
                <li>✔ At least 1 lowercase letter</li>
                <li>✔ At least 1 number</li>
                <li>✔ At least 1 special character (@$!%*?&)</li>
              </ul>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="btn w-100 fw-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #FF7B00, #FF5100)",
                color: "#fff",
                borderRadius: 30,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* BACK TO LOGIN */}
        <div className="text-center mt-3">
          <Link to="/login" style={{ color: "#FF7B00", fontSize: 14 }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;




