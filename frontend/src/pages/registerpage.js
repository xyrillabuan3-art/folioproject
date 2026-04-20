import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    password: "",
    confirmPassword: "",
    gender: "",
    accountType: ""
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGender = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (form.name === "") newErrors.name = "Name required";
    if (form.birth === "") newErrors.birth = "Birth required";
    if (form.password.length < 8) newErrors.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Password not match";
    if (form.gender === "") newErrors.gender = "Select gender";
    if (form.accountType === "") newErrors.accountType = "Select account";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Registration Successful!");
    }
  };

  return (
    <div className="container">
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #e8a8aa;
        }

        .main {
          display: flex;
          justify-content: center; /* Pinaka-importante: Pinapagitna ang content */
          align-items: flex-start;
          padding: 50px 20px;
          min-height: 80vh;
        }

        .content {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          max-width: 500px;
          width: 100%;
          text-align: center; /* Pinapagitna ang text sa loob */
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left; /* Para ang labels ay nasa kaliwa pa rin ng input */
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }

        .form-group input[type="text"],
        .form-group input[type="password"],
        .form-group input[type="date"],
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box; /* Para hindi lumampas ang width */
        }

        .radio-group {
          margin: 10px 0;
        }

        .error {
          color: red;
          font-size: 12px;
          display: block;
          margin-top: 5px;
        }

        .btn-register {
          background: #ff5c87;
          color: white;
          border: none;
          padding: 12px 30px;
          cursor: pointer;
          margin-top: 20px;
          border-radius: 25px;
          font-size: 16px;
          width: 100%;
          transition: background 0.3s;
        }

        .btn-register:hover {
          background: #e04b72;
        }

        .reg-img {
          margin-top: 30px;
          width: 100%;
          border-radius: 10px;
        }

        footer {
          padding: 20px;
          display: flex;
          justify-content: space-around;
          background: #fff;
          border-top: 1px solid #ddd;
        }

        footer a {
          margin: 0 10px;
          text-decoration: none;
          color: #ff5c87;
        }
      `}</style>

      <div className="main">
        <div className="content">
          <h2>Registration Form</h2>
          <p>For updates in K-Drama</p>

          <form onSubmit={validateForm}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input type="date" name="birth" value={form.birth} onChange={handleChange} />
              {errors.birth && <span className="error">{errors.birth}</span>}
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <input type="radio" name="gender" value="Male" onChange={handleGender}/> Male
                <input type="radio" name="gender" value="Female" onChange={handleGender}/> Female
                <input type="radio" name="gender" value="Other" onChange={handleGender}/> Other
              </div>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label>Account Type:</label>
              <select name="accountType" value={form.accountType} onChange={handleChange}>
                <option value="">Select Account Type</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="admin">Admin</option>
              </select>
              {errors.accountType && <span className="error">{errors.accountType}</span>}
            </div>

            <button type="submit" className="btn-register">Register</button>
          </form>

          <img src="/poster2.jpg" alt="kdrama" className="reg-img" />
        </div>
      </div>

      <footer>
        <div><p>© 2026 Korean Drama | All Rights Reserved</p></div>
        <div>
          <a href="mailto:xyrillabuan3@gmail.com">Email</a>
          <a href="/">Facebook</a>
          <a href="/">Instagram</a>
        </div>
      </footer>
    </div>
  );
}