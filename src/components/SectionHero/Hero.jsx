import "./Hero.css";

import leaf from "../../img/leaf.png";
import { useState, useEffect } from "react";

const Hero = function() {

  const [heroIsVisible, setHeroIsVisible] = useState(true);

  const HandleNavVisibility = function(entries) {
    const [entry] = entries;
    setHeroIsVisible(entry.isIntersecting);
  };


  // Seleção manual do DOM requer useEffect
  useEffect(() => {

    const sectionHero = document.querySelector('.section-hero');
    const observerOptions = {
      root: null,
      rootMargin: `-160px`,
      threshold: 0,
    };
  
    const navObserver = new IntersectionObserver(HandleNavVisibility, observerOptions);
    navObserver.observe(sectionHero);

  }, []);


  return (
    <section className='section-hero'>
      <div className='sub-container--hero helper'>

        <nav className={heroIsVisible ? 'nav-bar' : 'nav-bar sticky'}>
          {/* Aqui em algum momento teremos um LOGO */}
          <p className='logo-text'>hosana</p>

          <ul className={heroIsVisible ? 'nav-list' : 'nav-list sticky-nav-helper'}>
            <li className='nav-list-item'>
              <p className='nav-text'>About</p>
            </li>

            <li className='nav-list-item'>
              <p className='nav-text'>Projects</p>
            </li>

            <li className='nav-list-item'>
              <p className='nav-text'>Contact</p>
            </li>

            <li className='nav-list-item'>
              <p className='nav-text'>Blog</p>
            </li>
          </ul>
        </nav>

        <div className='hero-container'>
          <div className='first-column'>
            <h1 className='main-title'>Hi! I'm Diego,<br/>Front-End Developer</h1>
            <p className='hero-paragraph'>Coding is about solving problems,<br/>but solving problems is not always coding, <br/>right?</p>
          </div>

          <div className='second-column'>
            <img src={leaf} alt='' className='hero-img'/>
          </div>

        </div>
      </div>
  </section>
  );
};

export default Hero;