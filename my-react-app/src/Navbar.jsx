import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm fixed-top">
      <Link className="navbar-brand fw-bold fs-4" to="/">
      IntelliDocs
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle fw-semibold"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Smart Tools
            </Link>

            <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
              <li>
                <Link className="dropdown-item" to="/webinsight">
                  🌐 WebInsight — Ask from Multiple URLs
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/pdfinsight">
                  📄 PdfInsight — Ask from Multiple PDFs
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/replyAI">
                    🤖 SmartReply AI —  Ask question

                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
