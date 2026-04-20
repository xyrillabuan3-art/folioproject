import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Siniguradong tama ang format ng data
const gameData = [
  { pics: ["/assets/car.jpg", "/assets/pet.jpg"], word: "carpet" },
  { pics: ["/assets/sand.jpg", "/assets/witch.jpg"], word: "sandwich" },
  { pics: ["/assets/rain.jpg", "/assets/bow.jpg"], word: "rainbow" }
];

const quizData = [
  { q: "Who is the main actor in 'Goblin'?", a: "Lee Min Ho", b: "Gong Yoo", c: "Ji Chang Wook", correct: "b" },
  { q: "What K-Drama is about a soldier and a doctor?", a: "Vincenzo", b: "Itaewon Class", c: "Crash Landing on You", correct: "c" }
];

export default function GamesPage() {
  const [darkMode, setDarkMode] = useState(false);
  
  // 2 Pics 1 Word State
  const [currentGame, setCurrentGame] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameMessage, setGameMessage] = useState({ text: "", isError: false });

  // Quiz State
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizMessage, setQuizMessage] = useState({ text: "", isError: false });
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Handler para sa 2 Pics 1 Word
  const checkAnswer = () => {
    const correctWord = gameData[currentGame]?.word;
    if (userAnswer.trim().toLowerCase() === correctWord) {
      setGameMessage({ text: "🎉 Tama!", isError: false });
      setTimeout(() => {
        setCurrentGame((prev) => (prev + 1) % gameData.length);
        setUserAnswer("");
        setGameMessage({ text: "", isError: false });
      }, 1000);
    } else {
      setGameMessage({ text: "❌ Mali, subukan ulit.", isError: true });
    }
  };

  // Handler para sa Quiz
  const submitQuiz = () => {
    if (!selectedOption) return;
    const correct = quizData[currentQuiz].correct;
    if (selectedOption === correct) {
      setQuizScore(quizScore + 1);
      setQuizMessage({ text: "✅ Tama!", isError: false });
    } else {
      setQuizMessage({ text: "❌ Mali!", isError: true });
    }

    setTimeout(() => {
      if (currentQuiz + 1 < quizData.length) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedOption("");
        setQuizMessage({ text: "", isError: false });
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: darkMode ? "#222" : "#e8a8aa",
      color: darkMode ? "white" : "black",
      fontFamily: "Arial"
    }}>
      {/* SIDEBAR */}
      <div style={{ width: "200px", padding: "20px", background: "rgba(0,0,0,0.1)" }}>
        <h2>K-Drama</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/" style={{ color: "inherit" }}>Home</Link>
          <Link to="/register" style={{ color: "inherit" }}>Register</Link>
          <Link to="/contact" style={{ color: "inherit" }}>Contact</Link>
          <Link to="/games" style={{ fontWeight: "bold", color: "#ff5c87" }}>Games</Link>
        </nav>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
        <h1>2 Pictures 1 Word</h1>
        
        {/* Game Container */}
        <div style={{ background: darkMode ? "#333" : "white", padding: "20px", borderRadius: "10px", maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
            {/* Safety Check for images */}
            {gameData[currentGame] && (
              <>
                <img src={gameData[currentGame].pics[0]} alt="Pic 1" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />
                <img src={gameData[currentGame].pics[1]} alt="Pic 2" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />
              </>
            )}
          </div>
          <input 
            type="text" 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Sagot..."
            style={{ padding: "10px", width: "200px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={checkAnswer} style={{ padding: "10px 20px", background: "#ff5c87", color: "white", border: "none", cursor: "pointer" }}>Submit</button>
          <p style={{ color: gameMessage.isError ? "red" : "green" }}>{gameMessage.text}</p>
        </div>

        {/* QUIZ SECTION */}
        <h1 style={{ marginTop: "40px" }}>K-Drama Quiz</h1>
        <div style={{ background: darkMode ? "#333" : "white", padding: "20px", borderRadius: "10px", maxWidth: "500px", margin: "0 auto" }}>
          {!quizFinished ? (
            <>
              <h3>{quizData[currentQuiz]?.q}</h3>
              <div style={{ textAlign: "left", margin: "10px 0" }}>
                <label style={{ display: "block" }}>
                  <input type="radio" name="q" value="a" checked={selectedOption === "a"} onChange={(e) => setSelectedOption(e.target.value)} /> {quizData[currentQuiz]?.a}
                </label>
                <label style={{ display: "block" }}>
                  <input type="radio" name="q" value="b" checked={selectedOption === "b"} onChange={(e) => setSelectedOption(e.target.value)} /> {quizData[currentQuiz]?.b}
                </label>
                <label style={{ display: "block" }}>
                  <input type="radio" name="q" value="c" checked={selectedOption === "c"} onChange={(e) => setSelectedOption(e.target.value)} /> {quizData[currentQuiz]?.c}
                </label>
              </div>
              <button onClick={submitQuiz} style={{ padding: "10px 20px", background: "#ff5c87", color: "white", border: "none", cursor: "pointer", width: "100%" }}>Submit Choice</button>
              <p style={{ color: quizMessage.isError ? "red" : "green" }}>{quizMessage.text}</p>
            </>
          ) : (
            <h2>Tapos na! Score mo: {quizScore} / {quizData.length}</h2>
          )}
        </div>
      </div>
    </div>
  );
}