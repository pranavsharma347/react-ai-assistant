import { useTheme } from "./ThemeContext";

function Footer() {
  const { theme } = useTheme();

  // THEME COLORS
  const bg = theme === "dark" ? "#0F0F0F" : "#F5F5F5";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textMuted = theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const linkColor = theme === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.75)";
  const madeByColor = theme === "dark" ? "rgba(255,165,0,0.6)" : "#FF7B00";

  return (
    <footer
      className="text-center mt-0 py-4"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        marginTop: "60px",
      }}
    >
      <div className="container">
        {/* COPYRIGHT */}
        <p className="mb-2" style={{ color: textMuted }}>
          © 2025 IntelliDocs AI Platform
        </p>

        {/* LINKS */}
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {["About", "Contact", "Privacy", "Terms"].map((item) => (
            <button
              key={item}
              className="btn btn-link text-decoration-none"
              style={{
                color: linkColor,
                fontWeight: 500,
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* SIGNATURE */}
        <div
          style={{
            marginTop: "10px",
            color: madeByColor,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Made with ❤️ by Pranav Datta Sharma
        </div>
      </div>
    </footer>
  );
}

export default Footer;
