import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-para">O'Vol  © Tous droits réservés (2022)</p>
      <NavLink
        to="/mentionsLegales"
      >
        <a className="footer-link"> &nbsp;&nbsp;&nbsp;Mentions Legales</a>
      </NavLink>
      <NavLink
        to="/contact"
      >
        <a className="footer-link"> &nbsp;&nbsp;&nbsp;Contact</a>
      </NavLink>
      <NavLink
        to="/apropos"
      >
        <a className="footer-link"> &nbsp;&nbsp;&nbsp;A Propos</a>
      </NavLink>
    </div>
  );
}

export default React.memo(Footer);
