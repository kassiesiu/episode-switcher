import React, { Component } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Episode Switcher</Navbar.Brand>

          <Form inline>
            <FormControl type="text" placeholder="Search"/>
            <Button variant="outline-success">Search</Button>
          </Form>

        </Navbar>
      </div>
    );
  }
}

export default Header;
