import { useState, useEffect } from "react";
import poster from "../assets/poster.webp";
import Contact from "../pages/contactpage"; 
import Register from "../pages/registerpage";
import About from "../pages/aboutpages";
import GamePage from "./gamepage";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#FFC6CA",
        color: darkMode ? "white" : "black",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: darkMode ? "#333" : "#ff9aa2",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Korean Drama</h2>

        <nav>
          {["Home", "About", "Contact", "Register", "Games"].map((item) => (
            <div
              key={item}
              onClick={() => setPage(item)}
              style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: page === item ? "white" : "transparent",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {item}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {page === "Home" && (
          <>
            <img
              src={poster}
              alt="Poster"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h1>K-Drama World</h1>
            <p>
              Dive into Korean Drama culture filled with emotion, comedy, and
              heart. K-Dramas are famous for their engaging stories and
              relatable characters.
            </p>
            <h2>Why I love K-Drama?</h2>
            <ul>
              <li>Unique storytelling</li>
              <li>High quality cinematography</li>
              <li>Beautiful OST songs</li>
              <li>Life lessons</li>
            </ul>
            <p>Watching K-drama helps me relax and feel inspired after studying.</p>
          </>
        )}

       

          {page === "Contact" && <Contact />}

          {page === "Register" && <Register />}

          {page === "About" && <About />}

          {page === "Game" && <GamePage />} 

        
       
          
    </div>
    </div>
  )}
