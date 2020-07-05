import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Grace Hopper Wisdom</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
            <NavItem>
              <NavLink tag={RRNavLink} to="/add">Add Quote</NavLink>
            </NavItem>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
