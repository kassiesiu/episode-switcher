import React from "react";
import { Navbar, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "./Input";

const Header = (props) => {
  const { onSearch } = props;
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Episode Switcher</Navbar.Brand>
          <Input buttonText="Search" onClick={onSearch} />
        </Container>
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  onSearch: () => {},
};

export default Header;
