
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useNavigate } from "react-router-dom";
import pranavImg from "./images/pranav.png";


import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // 🔐 AUTH CHECK
  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  // 🔒 PROTECTED NAVIGATION
  const handleProtectedClick = (path) => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  

  // Theme based styles
  const bg = theme === "light" ? "#FFFFFF" : "#0D0D0D";
  const text = theme === "light" ? "#000000" : "#FFFFFF";
  const cardBg = theme === "light" ? "#F7F7F7" : "#1A1A1A";
  const secondaryText = theme === "light" ? "#555" : "#CCCCCC";

  return (
    <main
      className="mt-5 pt-5"
      style={{ backgroundColor: bg, color: text, transition: "0.3s" }}
    >

      {/* HERO SECTION */}
      <section className="text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5 mb-3">
            Revolutionize Document Intelligence with AI
          </h1>

          <p className="fs-5 mb-4" style={{ color: secondaryText }}>
            Upload, analyze and automate insights from PDFs & Web pages within seconds.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">

            {/* <Link
              to="/webinsight"
              className="btn btn-lg px-4 fw-bold text-white ui-btn"
              style={{ backgroundColor: "#FF7B00", borderRadius: "40px" }}
            >
              🚀 Try WebInsight
            </Link> */}

            <button
              onClick={() => handleProtectedClick("/webinsight")}
              className="btn btn-lg px-4 fw-bold text-white ui-btn"
              style={{ backgroundColor: "#FF7B00", borderRadius: "40px" }}
            >
              🚀 Try WebInsight
            </button>


            {/* <Link
              to="/pdfinsight"
              className={`btn btn-lg px-4 fw-bold ${
                theme === "light" ? "btn-outline-dark ui-btn" : "btn-outline-light ui-btn"
              }`}
              style={{ borderRadius: "40px" }}
            >
              📄 Upload PDF
            </Link> */}

                        <button
              onClick={() => handleProtectedClick("/pdfinsight")}
              className={`btn btn-lg px-4 fw-bold ${
                theme === "light"
                  ? "btn-outline-dark ui-btn"
                  : "btn-outline-light ui-btn"
              }`}
              style={{ borderRadius: "40px" }}
            >
              📄 Upload PDF
            </button>

          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
     {/* FOUNDER SECTION */}
<section className="py-5" style={{ backgroundColor: bg }}>
  <div className="container">
    <div className="row align-items-center justify-content-between">

      {/* IMAGE SIDE (Mobile FIRST) */}
      <div className="col-md-5 order-1 order-md-2 text-center position-relative mb-4 mb-md-0">
        <div
          style={{
            width: "280px",
            height: "280px",
          
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        ></div>

        <img
          // src="/src/images/pranav.png"
          src={pranavImg}
          alt="Founder"
          className="img-fluid position-relative"
          style={{
            width: "260px",
            borderRadius: "90px",
            zIndex: 1,
          }}
        />
      </div>

      {/* TEXT SIDE */}
      <div className="col-md-6 order-2 order-md-1">
        <h2
          className="fw-bold display-6 mb-3"
          style={{ color: "#FF7B00" }}
        >
          The Vision Behind IntelliDocs
        </h2>

        <p className="fs-5" style={{ color: text }}>
          I’m <b>Pranav Datta Sharma</b>, creator of IntelliDocs. My mission is to
          make knowledge extraction blazing fast using AI — so you save time
          and focus on what truly matters.
        </p>

        <p className="fs-6" style={{ color: secondaryText }}>
            Software Engineer | Python • Django • RestAPI • LangChain • RAG • Generative AI
        </p>

        {/* SOCIAL ICON BUTTONS */}
        <div className="mt-3 d-flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/pranav-sharma98"
            className={`btn rounded-pill px-3 d-flex align-items-center gap-2 ${
              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
            }`}
            target="_blank"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>

          <a
            href="https://github.com/pranavsharma347/"
            className={`btn rounded-pill px-3 d-flex align-items-center gap-2 ${
              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
            }`}
            target="_blank"
          >
            <FaGithub size={18} /> GitHub
          </a>

          <a
            href="https://www.facebook.com/pranav.sharma.12576/"
            className={`btn rounded-pill px-3 d-flex align-items-center gap-2 ${
              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
            }`}
            target="_blank"
          >
            <FaFacebook size={18} /> Facebook
          </a>

          <a
            href="https://www.instagram.com/pranavsharma886/"
            className={`btn rounded-pill px-3 d-flex align-items-center gap-2 ${
              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
            }`}
            target="_blank"
          >
            <FaInstagram size={18} /> Instagram
          </a>
{/* 
          <a
            href="https://wa.me/yourNumber"
            className={`btn rounded-pill px-3 d-flex align-items-center gap-2 ${
              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
            }`}
            target="_blank"
          >
            <FaWhatsapp size={18} /> WhatsApp
          </a> */}
        </div>
      </div>

    </div>
  </div>
</section>


      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Our Smart Tools</h2>
          <div className="row g-4">

            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4 shadow-lg border-0"
                style={{ backgroundColor: cardBg }}
              >
                <div className="fs-1 mb-3">🌐</div>
                <h5 className="fw-bold">WebInsight</h5>
                <p style={{ color: secondaryText }}>Ask questions directly from multiple URLs.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4 shadow-lg border-0"
                style={{ backgroundColor: cardBg }}
              >
                <div className="fs-1 mb-3">📄</div>
                <h5 className="fw-bold">PdfInsight</h5>
                <p style={{ color: secondaryText }}>Extract summaries & insights from documents.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4 shadow-lg border-0"
                style={{ backgroundColor: cardBg }}
              >
                <div className="fs-1 mb-3">🤖</div>
                <h5 className="fw-bold">SmartReply AI</h5>
                <p style={{ color: secondaryText }}>Instant AI-powered Q&A chatbot.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5" style={{ backgroundColor: theme === "light" ? "#F4F4F4" : "#111111" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <ol className="list-unstyled fs-5" style={{ color: secondaryText }}>
            <li className="mb-2">1️⃣ Choose a smart tool</li>
            <li className="mb-2">2️⃣ Upload PDFs or enter URLs</li>
            <li className="mb-2">3️⃣ Ask questions and get instant AI results</li>
          </ol>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Who Can Use It?</h2>
          <ul className="list-unstyled fs-5" style={{ color: secondaryText }}>
            <li>✔ Students</li>
            <li>✔ Lawyers & Legal Professionals</li>
            <li>✔ Job Seekers</li>
            <li>✔ Researchers & Analysts</li>
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        className="py-4 text-center"
        style={{ backgroundColor: theme === "light" ? "#F4F4F4" : "#111111" }}
      >
        <p className="fst-italic" style={{ color: secondaryText }}>
          “PdfInsight saved me 6 hours per day reviewing legal case files.”
        </p>
      </section>

    </main>
  );
}

export default Home;
