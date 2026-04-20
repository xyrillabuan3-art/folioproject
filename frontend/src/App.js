import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/splashpages';
import HomePage from './pages/homepage';
import AboutPage from './pages/aboutpages';
import ContactPage from './pages/contactpage';
import RegisterPage from './pages/registerpage';
import GamePage from './pages/gamepage';
function App() {
return (
<BrowserRouter>
<Routes>
<Route path='/' element={<SplashPage />} />
<Route path='/home' element={<HomePage />} />
<Route path='/about' element={<AboutPage />} />
<Route path='/contact' element={<ContactPage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path= '/game' element={<GamePage />} />
</Routes>
</BrowserRouter>
);
}
export default App;