import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-para">O'Vol  © Tous droits réservés (2022)</p>
      <Link
        to="/legalnotice"
      >
        <span className="footer-link"> &nbsp;&nbsp;&nbsp;Mentions Legales</span>
      </Link>
      <Link
        to="/contact"
      >
        <span className="footer-link"> &nbsp;&nbsp;&nbsp;Contact</span>
      </Link>
      <Link
        to="/about"
      >
        <span className="footer-link"> &nbsp;&nbsp;&nbsp;A Propos</span>
      </Link>
    </div>
  );
}

export default React.memo(Footer);
