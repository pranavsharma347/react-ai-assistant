import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { isAuthenticated, logoutUser } from "./utils/auth";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        backgroundColor: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">

        {/* BRAND */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          style={{ color: theme === "dark" ? "#ff7b00" : "#d35400" }}
        >
          IntelliDocs
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSE */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center align-items-lg-center">

            {/* THEME TOGGLE */}
            <li className="nav-item my-2 my-lg-0 me-lg-3">
              <button
                onClick={toggleTheme}
                className="btn"
                style={{
                  minWidth: "110px",
                  backgroundColor: theme === "dark" ? "#ff7b00" : "#222",
                  color: theme === "dark" ? "#000" : "#FFF",
                  borderRadius: "30px",
                  padding: "6px 14px",
                  fontWeight: "600",
                }}
              >
                {theme === "dark" ? "☀ Light" : "🌙 Dark"}
              </button>
            </li>

            {/* ============ LOGIN KE BAAD ============ */}
            {isLoggedIn && (
              <>
                {/* SMART TOOLS */}
                <li className="nav-item dropdown my-2 my-lg-0 me-lg-3">
                  <span
                    className="nav-link dropdown-toggle fw-semibold"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{
                      color: theme === "dark" ? "#FFF" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    🧠 Smart Tools
                  </span>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{
                      backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFF",
                    }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/webinsight">
                        🌐 WebInsight
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/pdfinsight">
                        📄 PDFInsight
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/replyAI">
                        🤖 SmartReply AI
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* PROFILE */}
                <li className="nav-item dropdown my-2 my-lg-0">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{
                      borderRadius: "30px",
                      padding: "6px 14px",
                      minWidth: "160px",
                    }}
                  >
                    👤 {localStorage.getItem("user_email")}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* ============ LOGIN SE PEHLE ============ */}
            {!isLoggedIn && (
              <li className="nav-item my-2 my-lg-0">
                <Link
                  to="/login"
                  className="btn btn-primary"
                  style={{
                    minWidth: "110px",
                    background: "linear-gradient(90deg, #ff7b00, #ffa733)",
                    border: "none",
                    borderRadius: "30px",
                    padding: "6px 16px",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
