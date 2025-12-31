import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin as googleAuth } from "./utils/auth";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const bg = "#0D0D0D";
  const cardBg = "#1A1A1A";
  const text = "#FFFFFF";
  const muted = "#BBBBBB";
  const border = "#333";

  /* ⏳ RESEND TIMER */
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && message) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, message]);

  /* 🔐 NORMAL SIGNUP */
  const handleSignup = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,64}$/;

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("❌ Email and Password are required");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "❌ Password must be 8–64 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://geniehub.duckdns.org/user/register/",
        { email, password }
      );

      setMessage(res.data.message);
      setTimer(600);
      setCanResend(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          "❌ Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* 🔐 GOOGLE LOGIN (FIXED VERSION) */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(""); // 🔥 CLEAR OLD ERROR

      await googleAuth(credentialResponse);

      navigate("/"); // ✅ SUCCESS → HOME
    } catch (err) {
      console.error(err);
      setError("❌ Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* 🔁 RESEND EMAIL */
  const handleResend = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://geniehub.duckdns.org/user/resend-verification-email/",
        { email }
      );
      setTimer(600);
      setCanResend(false);
      setMessage("📧 Verification email resent!");
    } catch {
      setError("❌ Failed to resend email");
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
      }}
    >
      {/* 🔥 GLOBAL LOADER */}
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
            fontSize: 18,
          }}
        >
          Processing… Please wait
        </div>
      )}

      <div
        className="row w-100 shadow-lg rounded-4"
        style={{
          maxWidth: "900px",
          backgroundColor: cardBg,
          border: `1px solid ${border}`,
        }}
      >
        {/* LEFT */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center p-5"
          style={{
            background: "linear-gradient(135deg, #FF7B00, #FF5100)",
            color: "#fff",
          }}
        >
          <h2 className="fw-bold">IntelliDocs</h2>
          <p className="mt-3 fs-5">
            Create your account and unlock AI-powered document intelligence.
          </p>
          <ul className="mt-4">
            <li>✔ Secure authentication</li>
            <li>✔ Smart AI tools</li>
            <li>✔ Fast & scalable</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="col-md-6 p-5">
          <h3 style={{ color: text }}>Create Account 🚀</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn w-100 mb-3"
            style={{
              background: loading ? "#444" : "#FF7B00",
              color: "#fff",
              borderRadius: "30px",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {message && (
            <>
              <p style={{ color: muted }}>
                ⏳ Resend in {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>

              <button
                disabled={!canResend || loading}
                onClick={handleResend}
                className="btn w-100"
                style={{ background: "#222", color: muted }}
              >
                Resend Verification Email
              </button>
            </>
          )}

          <div className="text-center my-3" style={{ color: muted }}>
            OR
          </div>

          {/* ✅ GOOGLE LOGIN (FIXED) */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() =>
              console.warn("Google popup closed or interrupted")
            }
            theme="filled_black"
            shape="pill"
            size="large"
            width="100%"
          />

          <div className="text-center mt-4" style={{ color: muted }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#FF7B00" }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
