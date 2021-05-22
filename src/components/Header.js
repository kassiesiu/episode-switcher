import React, { Component } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
    };

    this.setSearchInput = this.setSearchInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.search = this.search.bind(this);
  }

  handleKeyPress(target) {
    // fixed bug where pressing enter would refresh page
    if (target.charCode === 13) {
      target.preventDefault();
      this.search();
    }
  }

  setSearchInput(e) {
    this.setState({
      searchInput: e.currentTarget.value,
    });
  }

  search() {
    const { searchInput } = this.state;
    const { onSearch } = this.props;
    onSearch(searchInput);
  }

  render() {
    const { searchInput } = this.state;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Episode Switcher</Navbar.Brand>

          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={this.setSearchInput}
              onKeyPress={this.handleKeyPress}
            />
            <Button variant="outline-success" onClick={this.search}>
              Search
            </Button>
          </Form>
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
