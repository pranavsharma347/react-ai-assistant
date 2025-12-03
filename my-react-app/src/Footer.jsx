function Footer() {
  return (
    <footer className="py-4 bg-light text-center mt-0">
      <div className="container">
        <p className="text-muted mb-1">© 2025 IntelliDocs AI Platform</p>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <button className="btn btn-link text-muted text-decoration-none">About</button>
          <button className="btn btn-link text-muted text-decoration-none">Contact</button>
          <button className="btn btn-link text-muted text-decoration-none">Privacy</button>
          <button className="btn btn-link text-muted text-decoration-none">Terms</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
