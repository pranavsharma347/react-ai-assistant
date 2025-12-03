import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="mt-5 pt-5 bg-light">
      {/* Hero Section */}
      <section className="py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Revolutionize Document Intelligence with AI
          </h1>
          <p className="lead text-muted mb-4">
            Upload, ask, and automate insights from PDFs, web articles & chat in seconds.
          </p>

          <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
            <Link to="/webinsight" className="btn btn-dark btn-lg px-4">
              Try WebInsight
            </Link>
            <Link to="/pdfinsight" className="btn btn-outline-dark btn-lg px-4">
              Upload PDF
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <div className="mb-2 fs-1">📘</div>
                  <h5 className="card-title fw-bold">WebInsight</h5>
                  <p className="card-text text-muted">
                    Ask questions from multiple URLs instantly and get precise answers.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <div className="mb-2 fs-1">📄</div>
                  <h5 className="card-title fw-bold">PdfInsight</h5>
                  <p className="card-text text-muted">
                    Extract summaries, answers & insights from multiple PDF documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <div className="mb-2 fs-1">🤖</div>
                  <h5 className="card-title fw-bold">SmartReply AI</h5>
                  <p className="card-text text-muted">
                    Chat with your documents and get instant AI-powered responses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <ol className="list-unstyled fs-5 text-muted">
            <li className="mb-2">1. Choose a smart tool (WebInsight, PdfInsight or SmartReply).</li>
            <li className="mb-2">2. Upload PDFs or paste website URLs.</li>
            <li className="mb-2">3. Ask questions & get instant AI answers.</li>
          </ol>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Example Use Cases</h2>
          <ul className="list-unstyled fs-5 text-muted">
            <li className="mb-2">✔ Students – Summarize and revise study PDFs faster.</li>
            <li className="mb-2">✔ Lawyers – Analyze large legal documents & case files.</li>
            <li className="mb-2">✔ Job seekers – Extract key points from job descriptions & resumes.</li>
            <li className="mb-2">✔ Researchers – Compare and query multiple research papers.</li>
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-4 bg-white">
        <div className="container text-center">
          <p className="fst-italic text-muted mb-0">
            “PdfInsight saved me 6 hours per day reviewing legal case files.”
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-top bg-light">
        <div className="container d-flex flex-wrap justify-content-center gap-4">
          <button className="btn btn-link text-muted text-decoration-none">About</button>
          <button className="btn btn-link text-muted text-decoration-none">Contact</button>
          <button className="btn btn-link text-muted text-decoration-none">Privacy</button>
          <button className="btn btn-link text-muted text-decoration-none">Terms</button>
        </div>
      </footer>
    </main>
  );
}

export default Home;
