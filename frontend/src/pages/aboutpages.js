import React, { useEffect, useState } from "react";
import Comfort from "../assets/scene.webp";


function AboutPage(){

const [darkMode,setDarkMode] = useState(false);

useEffect(()=>{
const mode = localStorage.getItem("theme");

if(mode==="dark"){
document.body.classList.add("dark-mode");
setDarkMode(true);
}
},[]);

const toggleMode = ()=>{

if(darkMode){
document.body.classList.remove("dark-mode");
localStorage.setItem("theme","light");
setDarkMode(false);
}
else{
document.body.classList.add("dark-mode");
localStorage.setItem("theme","dark");
setDarkMode(true);
}

};

return(

<div>

<div className="sidebar">

<h2>Korean Drama</h2>

<nav>
<a href="#">Home</a>
<a href="#" className="active">About</a>
<a href="#">Contact</a>
<a href="#">Register</a>
<a href="#">Games</a>
</nav>

<button className="mode-btn" onClick={toggleMode}>
{darkMode ? "Light Mode" : "Dark Mode"}
</button>

</div>


<div className="content">

<h1>About K-Drama</h1>

<section>

<h2>What is K-Drama?</h2>

<p>
K-Drama refers to Korean television series known for their unique plots,
emotional storytelling, and cinematic visuals. From romance and comedy
to thriller and historical genres, K-Dramas have taken over global
entertainment. K-Dramas have become a global sensation, captivating
audiences with their unique blend of romance, drama, and humor.
Each series tells a compelling story that often explores love,
family, and personal growth. Beyond entertainment, K-Dramas also
introduce viewers to Korean culture, traditions, and music,
making them both fun and educational to watch.
</p>

<img src={Comfort} alt="Comfort kdrama" className="abt-img"/>

</section>


<section>

<h2>My K-Drama Journey</h2>

<p>
I started watching K-Drama in the year 2021 during the pandemic.
My friend suggested that I should watch K-Dramas because they
offered stories that felt real and comforting. Over time it became
my hobby and a source of relaxation.
</p>

<img src="/assets/actors.jpg" alt="actors and actress" className="abt-img"/>

</section>


<h3>My K-Drama Timeline</h3>

<ol>

<li>First K-Drama I watched: School 2015</li>
<li>Started exploring rom-coms: 2022</li>
<li>Discovered OSTs and fan edits: 2023</li>
<li>Became a full K-Drama fan: 2024 - 2026</li>

</ol>


<blockquote>
“Sometimes the wrong train takes you to the right station." - Goblin
</blockquote>

</div>


<footer>

<div className="footer-left">
<p>© 2026 Korean Drama | All Rights Reserved</p>
</div>

<div className="footer-right">

<a href="mailto:xyrillabuan3@gmail.com">Email</a>

<a href="https://www.facebook.com/Xyrill Shane Abuan" target="_blank">
Facebook
</a>

<a href="https://www.instagram.com/xyqttt" target="_blank">
Instagram
</a>

</div>

</footer>

</div>

);

}

export default AboutPage;