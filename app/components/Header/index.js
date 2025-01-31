import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <NavLink to="/search" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </NavLink>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
