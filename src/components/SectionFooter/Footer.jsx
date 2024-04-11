import "./Footer.css";

import instagramLogo from '../../icons/logo-instagram.svg';
import linkedinLogo from '../../icons/logo-linkedin.svg';
import githubLogo from '../../icons/logo-github.svg';
import twitterLogo from '../../icons/logo-twitter.svg';
import emailLogo from '../../icons/mail-outline.svg';

const Footer = function() {
  return (
    <footer className='footer'>
    <div className='footer-grid-container'>
      <div className='footer-first-column'>
        <div className=''>
          <p className='logo-text'>hosana<span>.dev</span></p>
          <p className='auxiliary-text'>All rights reserved &copy; 2024</p>
          <p className='auxiliary-text'>Soli Deo gloria</p>    
        </div>

        <ul className='social-links-list'>
          <li>
            <img
              src={linkedinLogo}
              alt="social network logo"
              className='social-icon'
            />
          </li>

  
          <li>
            <img
              src={twitterLogo}
              alt="social network logo"
              className='social-icon'
            />
          </li>

          <li>
            <img
              src={instagramLogo}
              alt="social network logo"
              className='social-icon'
            />
          </li>

          <li>
            <img
              src={githubLogo}
              alt="social network logo"
              className='social-icon'
            />
          </li>
  
          <li>
            <img
              src={emailLogo}
              alt="social network logo"
              className='social-icon'
            />
          </li>
        </ul>
      </div>

      <div className='footer-second-column'>
        <h4 className='title-fourth'>Extras</h4>
        <ul className='footer-list'>
          <li className='footer-list-item'>My resumé</li>
          <li className='footer-list-item'>My Blog</li>
          <li className='footer-list-item'>Cookies policy</li>
          <li className='footer-list-item'>Older versions</li>
        </ul>
      </div>

      <div className='footer-second-column'>
        <h4 className='title-fourth'>Stuff</h4>
        <ul className='footer-list'>
          <li className='footer-list-item'>My resumé</li>
          <li className='footer-list-item'>My Blog</li>
          <li className='footer-list-item'>Cookies policy</li>
        </ul>
      </div>

      <div className='footer-second-column'>
        <h4 className='title-fourth'>Foobar</h4>
        <ul className='footer-list'>
          <li className='footer-list-item'>My resumé</li>
          <li className='footer-list-item'>My Blog</li>
          <li className='footer-list-item'>Cookies policy</li>
          <li className='footer-list-item'>Older versions</li>
        </ul>
      </div>


    </div>
  </footer>
  );
};

export default Footer;