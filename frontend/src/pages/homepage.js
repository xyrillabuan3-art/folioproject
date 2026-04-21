import { useState, useEffect } from "react";
import poster from "../assets/poster.webp";
import Contact from "../pages/contactpage"; 
import Register from "../pages/registerpage";
import About from "../pages/aboutpages";
import GamePage from "./gamepage";
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("Home");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (page === "Home") {
      const fetchPosts = async () => {
        try {
          const { data } = await API.get('/posts');
          setPosts(data);
        } catch (err) {
          console.error('Failed to fetch posts');
        }
      };
      fetchPosts();
    }
  }, [page]);

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
            <h1>Latest Posts</h1>
            {posts.map(post => (
              <div key={post._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
                <p>By {post.author.name}</p>
                {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt='Cover' style={{ maxWidth: '200px' }} />}
                <p>{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </>
        )}

       

          {page === "Contact" && <Contact />}

          {page === "Register" && <Register />}

          {page === "About" && <About />}

          {page === "Games" && <GamePage />} 

        
       
          
    </div>
    </div>
  )}
