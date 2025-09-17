import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Features from './components/Features'; 
import Courses from './components/Courses';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<div><Home /><Footer/></div>} />
          <Route path="/features" element={<div><Features /><Footer/></div>} />
          <Route path="/courses" element={<div><Courses/><Footer/></div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;