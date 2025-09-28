import Home from './components/Home';
import Features from './components/Features'; 
import Courses from './components/Courses';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  return (
      <div className="App">
        <Navbar />
        <main >
        <Home />
        <Features />
        <Courses />
        <Contact />
      </main>
      <Footer />
      </div>
  );
}

export default App;