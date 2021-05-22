import React, { Component } from "react";
import { Navbar, Form, FormControl, Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "./Input";

class Header extends Component {
  render() {
    const { onSearch } = this.props;
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Episode Switcher</Navbar.Brand>
            <Input buttonText="Replace" onClick={onSearch} />
          </Container>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  onSearch: () => {},
};

export default Header;
