import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import location from "../assets/location.PNG";

export default function Contact() {
  const navigate = useNavigate();

  /* ===== DARK MODE ===== */
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ===== FORM STATE ===== */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  /* ===== VALIDATION ===== */
  function validateForm(e) {
    e.preventDefault();
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Message submitted successfully!");
      setName(""); setEmail(""); setMessage("");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Ginawang column para ma-center pababa
        alignItems: "center",    // Pinaka-importante: Lahat ng content mapupunta sa gitna horizontally
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#FFC6CA",
        color: darkMode ? "white" : "black",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "40px 20px 100px 20px", // May padding sa ilalim para hindi matakpan ng footer
        transition: "all 0.3s ease"
      }}
    >
      {/* ===== DARK MODE TOGGLE ===== */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        style={{
          alignSelf: "flex-end",
          padding: "8px 15px",
          cursor: "pointer",
          borderRadius: "20px",
          border: "none",
          backgroundColor: darkMode ? "#444" : "#fff",
          color: darkMode ? "white" : "black",
          marginBottom: "20px"
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
        <h1>Contact & Resources</h1>
        <p>Feel free to reach out for K-Drama updates!</p>

        {/* ===== FORM ===== */}
        <div style={{ 
          backgroundColor: darkMode ? "#333" : "white", 
          padding: "30px", 
          borderRadius: "15px", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          margin: "20px auto",
          maxWidth: "500px",
          textAlign: "left"
        }}>
          <form onSubmit={validateForm}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}
              />
              {errors.name && <small style={{ color: "#ff4d4d" }}>{errors.name}</small>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}
              />
              {errors.email && <small style={{ color: "#ff4d4d" }}>{errors.email}</small>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px", minHeight: "100px" }}
              />
              {errors.message && <small style={{ color: "#ff4d4d" }}>{errors.message}</small>}
            </div>

            <button
              type="submit"
              style={{
                padding: "12px",
                width: "100%",
                backgroundColor: "#ff5c87",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* ===== TABLE ===== */}
        <h2 style={{ marginTop: "50px" }}>Useful Resources</h2>
        <table
          style={{ 
            borderCollapse: "collapse", 
            width: "100%", 
            backgroundColor: darkMode ? "#333" : "white",
            marginTop: "10px",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <thead style={{ backgroundColor: "#ff9aa2", color: "white" }}>
            <tr>
              <th style={{ padding: "15px" }}>Resource Name</th>
              <th style={{ padding: "15px" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px" }}>MyDramaList</td>
              <td style={{ padding: "12px" }}>Read reviews, ratings and drama lists.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px" }}>Netflix</td>
              <td style={{ padding: "12px" }}>Stream popular Korean dramas.</td>
            </tr>
            <tr>
              <td style={{ padding: "12px" }}>VIU / KissKH</td>
              <td style={{ padding: "12px" }}>Legal streaming platforms for K-dramas.</td>
            </tr>
          </tbody>
        </table>

        {/* ===== MAP ===== */}
        <h2 style={{ marginTop: "50px" }}>Our Location</h2>
        <div style={{ marginBottom: "50px" }}>
          <img
            src={location}
            alt="Map"
            style={{ width: "100%", maxWidth: "600px", borderRadius: "15px", border: "5px solid white" }}
          />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: darkMode ? "#111" : "#ff9aa2",
          color: "white",
          padding: "15px 40px",
          display: "flex",
         
          alignItems: "center",
          fontSize: "14px"
        }}
      >
        <div>© 2026 Korean Drama | All Rights Reserved</div>
        <div>
          <a href="mailto:xyrillabuan3@gmail.com" style={{ color: "white", textDecoration: "none" }}>Email</a> |{" "}
          <a href="https://www.facebook.com" style={{ color: "white", textDecoration: "none" }}>Facebook</a> |{" "}
          <a href="https://www.instagram.com" style={{ color: "white", textDecoration: "none" }}>Instagram</a>
        </div>
      </footer>
    </div>
  );
}