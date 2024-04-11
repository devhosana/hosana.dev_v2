import "./About.css"

import me from "../../img/me.jpeg";

const About = function() {
  return (
    <section className='section-about'>
      <h3 className='tertiary-title'>About</h3>
      <h2 className='secondary-title'>Who I am</h2>

      <div className='container-grid-about'>
        <div className='profile-img-container'>
          <div className='profile-img-helper'>
            <img
              src={me}
              alt="Diego profile"
              className='about-profile-img'
            />
          </div>

          <div className='profile-info-container'>
            <p className='profile-text'>
              Diego Rocha
            </p>
            <p className='profile-text'>
              Coding from Brazil
            </p>
          </div>
        </div>

        <div className='sub-container--paragraph-skills'>
          <div className='container-paragraph'>
            <h4 className='quaternary-title'>Random sub-title</h4>
            <p className='about-paragraph'>
              I strongly believe that lorem ipsum dolor sit amet consectetur adipisicing elit ipsam numquam, repellat quae sapiente similique voluptas placeat est maxime facere, minus debitis porro dicta dolorem quos aliquam, ipsum non aspernatur?
            </p>

            <p className='about-paragraph'>
              Also lorem ipsum dolor sit amet, consectetur adipisicing elit ex corrupti unde facilis enim, est maxime reprehenderit velit aut impedit laborum maxime soli Deo gloria, solus Christus, sola Scriptura, sola Gratia, sola Fide amen.
            </p>
          </div>
        
          <div className='container-skills'>
            <h4 className='quaternary-title'>My tech stack</h4>

            <div>
              <div className='skill-container'>
                <p>Html 5</p>
              </div>
              <div className='skill-container'>
                <p>Css 3</p>
              </div>
              <div className='skill-container'>
                <p>Sass</p>
              </div>
              <div className='skill-container'>
                <p>Figma</p>
              </div>
              <div className='skill-container'>
                <p>Github</p>
              </div>
              <div className='skill-container'>
                <p>JavaScript</p>
              </div>
              <div className='skill-container'>
                <p>TypeScript</p>
              </div>
              <div className='skill-container'>
                <p>React</p>
              </div>
              <div className='skill-container'>
                <p>Redux</p>
              </div>
              <div className='skill-container'>
                <p>Node.JS</p>
              </div>
              <div className='skill-container'>
                <p>Express</p>
              </div>
              <div className='skill-container'>
                <p>Mongo DB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  </section>
  );
};

export default About;