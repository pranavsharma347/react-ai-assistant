import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { isAuthenticated, logoutUser } from "./utils/auth";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  /* 🔥 Dropdown Item Style */
  const getDropdownItemStyle = (path) => {
    const isActive = location.pathname === path;
    const isHovered = hoveredItem === path;

    return {
      color: theme === "dark" ? "#FFFFFF" : "#000000",
      backgroundColor:
        isActive || isHovered
          ? theme === "dark"
            ? "#ff7b00"
            : "#ffe0c2"
          : "transparent",
      boxShadow:
        isHovered && theme === "dark"
          ? "0 0 12px rgba(255,123,0,0.8)"
          : "none",
      fontWeight: isActive ? "600" : "500",
      borderRadius: "8px",
      padding: "8px 12px",
      transition: "all 0.25s ease",
      cursor: "pointer",
    };
  };

  /* 🔥 Hamburger Color */
  const hamburgerColor = theme === "dark" ? "#FFFFFF" : "#000000";

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

        {/* 🔥 CUSTOM HAMBURGER (SVG) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{
            border: "none",
            padding: "6px",
            boxShadow:
              theme === "dark"
                ? "0 0 10px rgba(255,123,0,0.6)"
                : "none",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={hamburgerColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
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

            {/* LOGIN KE BAAD */}
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
                      backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
                      border:
                        theme === "dark"
                          ? "1px solid #333"
                          : "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {[
                      ["/webinsight", "🌐 WebInsight AI"],
                      ["/pdfinsight", "📄 PDFInsight AI"],
                      ["/replyAI", "🤖 SmartReply AI"],
                    ].map(([path, label]) => (
                      <li key={path}>
                        <Link
                          to={path}
                          className="dropdown-item"
                          style={getDropdownItemStyle(path)}
                          onMouseEnter={() => setHoveredItem(path)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
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

            {/* LOGIN SE PEHLE */}
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
