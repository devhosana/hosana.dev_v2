import "./CardProject.css";

import githubLogo from '../../../icons/logo-github.svg';
import linkLogo from '../../../icons/link-outline.svg';
import infoLogo from "../../../icons/information-circle-outline.svg"

import { Fragment } from "react";



const CardProject = function({
    title,
    description,
    imgSample,
    index,
    handleProjectsMovement,
    position,
    translateValue,
    deckIndex,
  }) {

  return (
    <div
      className={'main-container--card-project'}
      style={{ transform: `translateX(${translateValue}%)` }}
    >

      <div className={`left-container--card-project ${position === index ? 'active' : 'inactive'}`}>
        <div
          className={`right-container--card-project ${position === index ? 'active-helper' : ''}`}
          onClick={() => handleProjectsMovement(index, deckIndex)}
        >
          <div>
            <h3 className='tertiary-title'>

              {/* Quebrando título programaticamente (também em description) */}
              {title
                .split('*')
                .map((string, index) => {
                  return(
                    <Fragment
                      key={index}
                    >
                      {string}
                      <br/>
                    </Fragment>
                  )
                })
              }

            </h3>

            <p className='project-description'>
            {description
                .split('*')
                .map((string, index) => {
                  return(
                    <Fragment
                      key={index}
                    >
                      {string}
                      <br/>
                    </Fragment>
                  )
                })
              }
            </p>
          </div>

          <img
            className='temp'
            src={imgSample}
            alt="App illustration sample"
          />

          <div className='project-links-container'>
            <img
              className='project-link-icon'
              src={linkLogo}
              alt="project link"
            />  

            <img
              className='project-link-icon'
              src={githubLogo}
              alt="project link"
            />

            <img
              className='project-link-icon'
              src={infoLogo}
              alt="project link"
            />           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;