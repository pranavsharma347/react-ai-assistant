import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying email...");
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`https://geniehub.duckdns.org/user/verify-email/?token=${token}`)
      .then(() => {
        setMessage("✅ Email verified successfully! Now redirecting to login...");
        setTimeout(() => navigate("/login"), 10000);
      })
      .catch(() => {
        setMessage("❌ Verification failed or link expired");
      });
  }, [token]);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h3>{message}</h3>
    </div>
  );
}

export default VerifyEmail;
