// CSS
import './App.css';

// COMPONENT INSTANCES
import Hero from "./components/SectionHero/Hero";
import About from "./components/SectionAbout/About";
import Projects from "./components/SectionProjects/Projects";
import Footer from "./components/SectionFooter/Footer";


function App() {
  return (
    <>
      <Hero/>
      <About/>
      <Projects/>
      <Footer/>
    </>
  );
};

export default App;
