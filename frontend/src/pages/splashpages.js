
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const [dots, setDots] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots(".".repeat(count));
    }, 500);

    const timeout = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        navigate("/home");
      }, 500);

    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };

  }, [navigate]);

  return (
    <div style={styles.body}>
      <div
        style={{
          ...styles.container,
          ...(fadeOut && styles.fadeOut)
        }}
      >
        <div style={styles.logo}>🍜</div>

        <h1 style={styles.title}>Korean Drama</h1>

        <div style={styles.spinner}></div>

        <div style={styles.loadingText}>
          Loading<span>{dots}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#FFB0B5",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    textAlign: "center",
    color: "white",
    transition: "opacity 0.5s ease-out"
  },

  fadeOut: {
    opacity: 0
  },

  logo: {
    fontSize: "100px",
    marginBottom: "30px"
  },

  title: {
    fontSize: "42px",
    marginBottom: "20px"
  },

  spinner: {
    width: "80px",
    height: "80px",
    border: "8px solid rgba(255,255,255,0.3)",
    borderTop: "8px solid white",
    borderRadius: "50%",
    margin: "30px auto",
    animation: "spin 1s linear infinite"
  },

  loadingText: {
    fontSize: "20px",
    marginTop: "20px"
  }
};