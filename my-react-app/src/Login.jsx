import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleGoogleLogin as googleAuth } from "./utils/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const muted = "#BBBBBB";


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false); // 🔥 GLOBAL LOADER

  // Email verification resend
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const redirectTo = location.state?.from || "/";

  // TIMER
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && showResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, showResend]);

  // 🔐 NORMAL LOGIN
  const handleLogin = async () => {
    setError("");
    setMessage("");
    setShowResend(false);

    if (!email || !password) {
      setError("❌ Email and Password are required");
      return;
    }

    if (password.length < 8 || password.length > 64) {
      setError("❌ Password must be between 8 and 64 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://geniehub.duckdns.org/user/login/",
        { email, password }
      );

      localStorage.setItem("access_token", res.data.tokens.access);
      localStorage.setItem("refresh_token", res.data.tokens.refresh);
      localStorage.setItem("user_email", email);

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate(redirectTo), 1200);

    } catch (err) {
      const data = err.response?.data;

      if (data?.code === "EMAIL_NOT_VERIFIED") {
        setError("📧 Email not verified. Verification email sent.");
        setShowResend(true);
        setTimer(600);
        setCanResend(false);
      } else {
        setError(data?.error || data?.message || "❌ Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔐 GOOGLE LOGIN (WITH LOADER)
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true); // 🔥 START LOADER
      await googleAuth(credentialResponse);
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      setError("❌ Google login failed");
    } finally {
      setLoading(false); // 🔥 STOP LOADER
    }
  };

  // 🔁 RESEND VERIFICATION
  const handleResend = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://geniehub.duckdns.org/user/resend-verification-email/",
        { email }
      );
      setMessage("📧 Verification email resent!");
      setTimer(600);
      setCanResend(false);
    } catch {
      setError("❌ Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0D0D0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      {/* 🔥 FULL SCREEN LOADER */}
      {loading && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          color: "#fff",
          fontSize: 18,
        }}>
          Processing… Please wait
        </div>
      )}

      <div className="row w-100 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: 1000, backgroundColor: "#1A1A1A", border: "1px solid #333" }}
      >
        {/* LEFT */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-5"
          style={{ background: "linear-gradient(135deg, #FF7B00, #FF5100)", color: "#fff" }}
        >
          <h2 className="fw-bold">IntelliDocs</h2>
          <p className="mt-3 fs-5">
            Turn documents & web pages into instant AI-powered knowledge.
          </p>
        </div>

        {/* RIGHT */}
        <div className="col-md-6 p-5">
          <h3 className="fw-bold mb-2 text-white">Welcome Back 👋</h3>

          {error && <div className="alert alert-danger text-center">{error}</div>}
          {message && <div className="alert alert-success text-center">{message}</div>}

          <input
            type="email"
            placeholder="Email address"
            className="form-control mb-3"
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="position-relative mb-2">
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

          <div className="text-end mb-3">
            <Link to="/forgot-password" style={{ color: "#FF7B00", fontSize: 14 }}>
              Forgot password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn w-100 fw-bold mb-3 d-flex justify-content-center align-items-center"
            style={{
              background: loading
                ? "#444"
                : "linear-gradient(135deg, #FF7B00, #FF5100)",
              color: "#fff",
              borderRadius: 30,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {showResend && (
            <>
              <p className="text-muted">
                ⏳ Resend in {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>
              <button
                disabled={!canResend || loading}
                onClick={handleResend}
                className="btn w-100 mb-3"
                style={{ background: "#222", color: "#bbb" }}
              >
                Resend Verification Email
              </button>
            </>
          )}

          <div className="text-center my-3 text-muted">OR</div>

          {/* GOOGLE LOGIN */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("❌ Google Login Failed")}
            theme="filled_black"
            shape="pill"
            size="large"
            width="100%"
          />

          <div className="text-center mt-4" style={{ color: muted }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#FF7B00" }}>
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
